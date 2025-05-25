import React, { useEffect, useState } from 'react';
import { createProducto, fetchProductoById, updateProducto } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function FormProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ nombre: '', codigo: '', stock: 0 });
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  // Si hay id, cargar datos existentes
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const { data } = await fetchProductoById(id);
        setForm({ nombre: data.nombre, codigo: data.codigo, stock: data.stock });
      } catch (err) {
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'stock' ? +value : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) await updateProducto(id, form);
      else    await createProducto(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data || 'Error al guardar');
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Nombre:</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Código:</label>
        <input
          name="codigo"
          value={form.codigo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Stock:</label>
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={() => navigate('/')}>Cancelar</button>
    </form>
  );
}
