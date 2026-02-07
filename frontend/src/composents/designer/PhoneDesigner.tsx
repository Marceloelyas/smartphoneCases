import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import ColorPicker from './ColorPicker';
import TextEditor from './TextEditor';
import ImageUploader from './ImageUploader';
import { Save, ShoppingCart, RotateCw } from 'lucide-react';

interface PhoneDesignerProps {
  initialModelId?: string;
}

const PhoneDesigner: React.FC<PhoneDesignerProps> = ({ initialModelId }) => {
  const { modelId } = useParams();
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [selectedModel, setSelectedModel] = useState(initialModelId || modelId || 'iphone-14');
  const [backgroundColor, setBackgroundColor] = useState('#3b82f6');
  const [textElements, setTextElements] = useState<Array<{
    id: string;
    text: string;
    x: number;
    y: number;
    color: string;
    fontSize: number;
    fontFamily: string;
  }>>([]);
  const [images, setImages] = useState<Array<{
    id: string;
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>>([]);
  const [activeTool, setActiveTool] = useState<'text' | 'image' | 'move'>('move');

  const phoneModels = [
    { id: 'iphone-14', name: 'iPhone 14', price: 89.90 },
    { id: 'samsung-s23', name: 'Samsung S23', price: 79.90 },
    { id: 'xiaomi-13', name: 'Xiaomi 13', price: 69.90 },
  ];

  const handleAddText = (text: string, color: string, fontSize: number, fontFamily: string) => {
    const newText = {
      id: `text-${Date.now()}`,
      text,
      x: 100,
      y: 100,
      color,
      fontSize,
      fontFamily,
    };
    setTextElements([...textElements, newText]);
  };

  const handleAddImage = (imageUrl: string) => {
    const newImage = {
      id: `image-${Date.now()}`,
      src: imageUrl,
      x: 50,
      y: 50,
      width: 200,
      height: 200,
    };
    setImages([...images, newImage]);
  };

  const handleSaveDesign = () => {
    const design = {
      model: selectedModel,
      backgroundColor,
      textElements,
      images,
      createdAt: new Date().toISOString(),
    };
    
    // Salvar no localStorage temporariamente
    localStorage.setItem('savedDesign', JSON.stringify(design));
    alert('Design salvo com sucesso!');
  };

  const handleAddToCart = () => {
    const selectedPhone = phoneModels.find(model => model.id === selectedModel);
    
    if (!selectedPhone) return;

    const design = {
      model: selectedModel,
      modelName: selectedPhone.name,
      backgroundColor,
      textElements,
      images,
      price: selectedPhone.price,
    };

    dispatch(addToCart({
      id: `design-${Date.now()}`,
      ...design,
      quantity: 1,
    }));

    alert('Design adicionado ao carrinho!');
  };

  const handleReset = () => {
    setBackgroundColor('#3b82f6');
    setTextElements([]);
    setImages([]);
  };

  // Renderizar preview no canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fundo
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Renderizar textos
    textElements.forEach(text => {
      ctx.font = `${text.fontSize}px ${text.fontFamily}`;
      ctx.fillStyle = text.color;
      ctx.fillText(text.text, text.x, text.y);
    });

    // Renderizar imagens
    images.forEach(image => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        ctx.drawImage(img, image.x, image.y, image.width, image.height);
      };
    });

  }, [backgroundColor, textElements, images]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Painel de Design */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Designer de Capinha</h2>
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveDesign}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Resetar</span>
                </button>
              </div>
            </div>

            {/* Canvas Preview */}
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-6">
              <canvas
                ref={canvasRef}
                width={600}
                height={800}
                className="w-full h-auto max-h-[500px]"
              />
            </div>

            {/* Seleção de Modelo */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Modelo do Celular</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {phoneModels.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-4 border-2 rounded-lg text-center ${
                      selectedModel === model.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{model.name}</div>
                    <div className="text-gray-600">R$ {model.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Painel de Ferramentas */}
        <div className="space-y-6">
          <ColorPicker
            color={backgroundColor}
            onChange={setBackgroundColor}
          />

          <TextEditor onAddText={handleAddText} />

          <ImageUploader onImageUpload={handleAddImage} />

          {/* Botão Adicionar ao Carrinho */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">Adicionar ao Carrinho</span>
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              R$ {phoneModels.find(m => m.id === selectedModel)?.price.toFixed(2)}
            </p>
          </div>

          {/* Preview dos Elementos */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Elementos do Design</h3>
            
            {textElements.length === 0 && images.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Nenhum elemento adicionado
              </p>
            ) : (
              <div className="space-y-4">
                {textElements.map(text => (
                  <div key={text.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{text.text}</div>
                      <div className="text-sm text-gray-500">
                        {text.fontFamily} - {text.fontSize}px
                      </div>
                    </div>
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: text.color }}
                    />
                  </div>
                ))}

                {images.map(image => (
                  <div key={image.id} className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <img
                        src={image.src}
                        alt="Uploaded"
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="text-sm text-gray-500">
                        Imagem {image.width}x{image.height}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDesigner;