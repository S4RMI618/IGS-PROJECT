import React, { useState } from 'react';
import { searchProductoByCode } from '../../services/api';

export default function SearchProducto() {
  const [codigo, setCodigo] = useState('');
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await searchProductoByCode(codigo.trim());
      setProducto(data);
      setError(null);
    } catch (err) {
      setError('Producto no encontrado');
      setProducto(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Código:
          <input
            type="text"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            required
          />
        </label>
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {producto && (
        <div>
          <h3>Datos del Producto</h3>
          <p><strong>ID:</strong> {producto.id}</p>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Código:</strong> {producto.codigo}</p>
          <p><strong>Stock:</strong> {producto.stock}</p>
        </div>
      )}
    </div>
  );
}
