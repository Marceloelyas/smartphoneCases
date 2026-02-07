import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">CaseDesigner</h3>
            <p className="text-gray-300 mb-4">
              Crie capinhas de celular personalizadas com seu design único.
              Qualidade premium, entrega rápida e total personalização.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contato</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@casedesigner.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Sobre Nós</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} CaseDesigner. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;