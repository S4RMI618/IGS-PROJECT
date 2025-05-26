import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProductos } from '../../services/api';
import ProductItem from '../../components/product/ProductItem';

export default function ListProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const redirectToAdd = () => {
    navigate('/productos/new');
  }

  if (loading) return <p className='text-4xl'>Cargando productos...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div className="grid place-items-center px-4">
      <h1 className="text-3xl font-semibold my-6 p-2 w-full text-center">Lista de Productos</h1>
      <table className=" max-w-xl border-collapse w-xl">
        <thead className="bg-indigo-800">
          <tr>
            <th className="px-6 py-3 text-left text-white">ID</th>
            <th className="px-6 py-3 text-left text-white">Nombre</th>
            <th className="px-6 py-3 text-left text-white">Código</th>
            <th className="px-6 py-3 text-left text-white">Stock</th>
          </tr>
        </thead>
        <tbody className="bg-indigo-400 divide-y divide-indigo-500">
          {productos.map((p) => (
            <ProductItem key={p.id} {...p} />
          ))}
        </tbody>
      </table>

      <div className="w-full grid place-items-center my-5">
        <button onClick={redirectToAdd}>Agregar Producto</button>
      </div>
    </div>
  );
}