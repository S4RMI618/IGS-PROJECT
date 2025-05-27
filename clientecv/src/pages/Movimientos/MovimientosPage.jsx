import React, { useEffect, useState } from "react";
import { fetchMovimientos, fetchProductos, fetchUsuarios, createMovimiento } from "../../services/api";
import MovimientosList from "./ListMovimientos";
import MovimientoForm from "./MovimientoForm";

export default function MovimientosPage() {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [movsRes, prodsRes, usersRes] = await Promise.all([
        fetchMovimientos(),
        fetchProductos(),
        fetchUsuarios(),
      ]);
      setMovimientos(movsRes.data);
      setProductos(prodsRes.data);
      setUsuarios(usersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCrearMovimiento = async (datos) => {
    try {
      await createMovimiento(datos);
      await loadAll(); // refrescar lista
    } catch (err) {
      throw err;
    }
  };

  if (loading) return <p className="text-center py-8">Cargando movimientos...</p>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Historial de Movimientos</h1>
      <MovimientoForm
        productos={productos}
        usuarios={usuarios}
        onSubmit={handleCrearMovimiento}
      />
      <MovimientosList movimientos={movimientos} />
    </div>
  );
}
