import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfigPage = () => {
  const [formData, setFormData] = useState({ appName: '', theme: '', features: [] });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(formData).toString();
    navigate(`/progress?${queryParams}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de la aplicación:
        <input
          type="text"
          value={formData.appName}
          onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
        />
      </label>
      <label>
        Tema:
        <select
          value={formData.theme}
          onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
        >
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </label>
      <button type="submit">Generar</button>
    </form>
  );
};

export default ConfigPage;
