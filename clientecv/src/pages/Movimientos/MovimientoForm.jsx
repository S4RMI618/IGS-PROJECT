import React, { useState } from "react";

const tipos = [
  { label: "Entrada", value: "ENTRADA" },
  { label: "Salida", value: "SALIDA" },
];

export default function MovimientoForm({ productos, usuarios, onSubmit }) {
  const [form, setForm] = useState({
    productoId: "",
    usuarioId: "",
    tipo: "ENTRADA",
    cantidad: "",
    observaciones: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.productoId || !form.usuarioId || !form.cantidad) {
      setError("Completa los campos obligatorios");
      return;
    }

    const cantidadNum = Number(form.cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      setError("Cantidad debe ser un número positivo");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        productoId: Number(form.productoId),
        usuarioId: Number(form.usuarioId),
        tipo: form.tipo,
        cantidad: cantidadNum,
        observaciones: form.observaciones.trim() || null,
      });
      setForm({
        productoId: "",
        usuarioId: "",
        tipo: "ENTRADA",
        cantidad: "",
        observaciones: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar movimiento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 mb-8 text-indigo-950">
      <h2 className="text-xl font-semibold mb-4">Registrar Movimiento</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-indigo-950">
          <label className="block mb-1 font-medium">Producto *</label>
          <select
            name="productoId"
            value={form.productoId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Seleccione producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-indigo-950">Usuario *</label>
          <select
            name="usuarioId"
            value={form.usuarioId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Seleccione usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tipo *</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            {tipos.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Cantidad *</label>
          <input
            type="number"
            min="1"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="md:col-span-3">
          <label className="block mb-1 font-medium">Observaciones</label>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </div>
    </form>
  );
}
