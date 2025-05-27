import React, { useEffect, useState } from "react";
import {
  createProducto,
  fetchProductoById,
  updateProducto,
} from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { useCatalogos } from "../../hooks/useCatalogos";

export default function FormProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    categories,
    laboratorios,
    distribuidores,
    loading: loadingCatalogos,
    error: errorCatalogos,
  } = useCatalogos();

  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    descripcion: "",
    categoria: { id: "" },
    laboratorio: { id: "" },
    distribuidor: { id: "" },
    registroSanitario: "",
    stock: "",
    precioUnitario: "",
  });

  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const { data } = await fetchProductoById(id);
        setForm({
          nombre: data.nombre || "",
          codigo: data.codigo || "",
          descripcion: data.descripcion || "",
          categoria: data.categoria ? { id: data.categoria.id } : { id: "" },
          laboratorio: data.laboratorio
            ? { id: data.laboratorio.id }
            : { id: "" },
          distribuidor: data.distribuidor
            ? { id: data.distribuidor.id }
            : { id: "" },
          registroSanitario: data.registroSanitario || "",
          stock: data.stock !== undefined ? data.stock : "",
          precioUnitario: data.precioUnitario
            ? data.precioUnitario.toString()
            : "",
        });
      } catch {
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["categoria", "laboratorio", "distribuidor"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: { id: parseInt(value) || "" },
      }));
    } else if (["stock", "precioUnitario"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: value.replace(/[^0-9.]/g, ""),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      console.log(form);
      if (id) await updateProducto(id, form);
      else await createProducto(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar");
    }
  };

  if (loading || loadingCatalogos)
    return <p className="text-center py-8">Cargando...</p>;
  if (errorCatalogos)
    return <p className="text-red-600 text-center">{errorCatalogos}</p>;

  return (
    <div className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-xl mx-auto bg-indigo-500 p-8 rounded-2xl shadow space-y-6 grid lg:grid-cols-2 gap-6"
      >
        <h2 className="text-2xl font-serif text-center mb-3 col-span-2">
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
            value={form.categoria.id || ""}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-3 py-2"
          >
            <option className="bg-gray-500" value="">
              Seleccione una categoría
            </option>
            {categories.map((cat) => (
              <option className="bg-gray-500" key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Laboratorio:</label>
          <select
            name="laboratorio"
            value={form.laboratorio.id || ""}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-3 py-2"
          >
            <option className="bg-gray-500" value="">
              Seleccione un laboratorio
            </option>
            {laboratorios.map((lab) => (
              <option className="bg-gray-500" key={lab.id} value={lab.id}>
                {lab.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Distribuidor:</label>
          <select
            name="distribuidor"
            value={form.distribuidor.id || ""}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-3 py-2"
          >
            <option className="bg-gray-500" value="">
              Seleccione un distribuidor
            </option>
            {distribuidores.map((dist) => (
              <option className="bg-gray-500" key={dist.id} value={dist.id}>
                {dist.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Registro Sanitario:
          </label>
          <input
            name="registroSanitario"
            value={form.registroSanitario}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Stock:</label>
          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Precio Unitario:</label>
          <input
            name="precioUnitario"
            type="number"
            min="0"
            step="0.01"
            value={form.precioUnitario}
            onChange={handleChange}
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
