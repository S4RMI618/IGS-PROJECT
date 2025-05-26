import React, { useEffect, useState } from "react";
import {
  createProducto,
  fetchProductoById,
  fetchCategorias,
  updateProducto,
} from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function FormProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    descripcion: "",
    precio: "",
  });
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await fetchCategorias();
      setCategories(data);
    } catch (err) {
      setError("No se pudo cargar las categorías");
    }
  };

  // Cargar datos si es edición
  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const { data } = await fetchProductoById(id);
        setForm({
          nombre: data.nombre || "",
          codigo: data.codigo || "",
          descripcion: data.descripcion || "",
          categoria: data.categoria || "",
          precio: data.precio !== undefined ? data.precio : "",
        });
      } catch (err) {
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);
  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precio" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (id) await updateProducto(id, form);
      else await createProducto(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar");
    }
  };

  if (loading) return <p className="text-center py-8">Cargando...</p>;

  return (
    <div className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-xl mx-auto bg-indigo-500 p-8 rounded-2xl shadow space-y-6"
      >
        <h2 className="text-2xl font-serif text-center mb-3">
          {id ? "Editar Producto" : "Crear Producto"}
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div>
          <label className="block font-semibold mb-1">Nombre:</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Código:</label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Descripción:</label>
          <input
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Categoría:</label>
          <select
            name="categoria"
            value={form.categoria || ""}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-3 py-2"
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((cat) => (
              <option
                className="bg-gray-700"
                key={cat._id || cat.id}
                value={cat._id || cat.id}
              >
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Precio:</label>
          <input
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
        <div className="flex gap-4 justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"
          >
            Guardar
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-xl bg-gray-400 text-white font-bold hover:bg-gray-500"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
