import React, { useState, useEffect } from 'react';

interface Model {
  id: string;
  name: string;
  description: string;
  // ... other fields
}

const ModelManagement: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch models from API
    // fetch('/api/models')
    //   .then(res => res.json())
    //   .then(data => {
    //     setModels(data);
    //     setLoading(false);
    //   });
  }, []);

  const handleDelete = (id: string) => {
    // Confirm and delete model
    // fetch(`/api/models/${id}`, { method: 'DELETE' })
    //   .then(() => setModels(models.filter(m => m.id !== id)));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="model-management">
      <h2>Model Management</h2>
      <button onClick={() => { /* open create modal or navigate */ }}>
        Add New Model
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map(model => (
            <tr key={model.id}>
              <td>{model.id}</td>
              <td>{model.name}</td>
              <td>{model.description}</td>
              <td>
                <button onClick={() => { /* edit */ }}>Edit</button>
                <button onClick={() => handleDelete(model.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelManagement;