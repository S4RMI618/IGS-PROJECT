import React, { useEffect, useState } from 'react';
import { fetchMovimientos } from '../../services/api';

export default function ListMovimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovimientos()
      .then(res => setMovimientos(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading movimientos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Histórico de Movimientos</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Producto</th><th>Tipo</th><th>Cantidad</th><th>Fecha</th></tr>
        </thead>
        <tbody>
          {movimientos.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.producto.nombre}</td>
              <td>{m.tipo}</td>
              <td>{m.cantidad}</td>
              <td>{new Date(m.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}