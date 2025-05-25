import React, { useEffect, useState } from 'react';
import { fetchProductos } from '../../services/api';

export default function ListProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchProductos();
        setProductos(data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Nombre</th><th>Código</th><th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.codigo}</td>
            <td>{p.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}