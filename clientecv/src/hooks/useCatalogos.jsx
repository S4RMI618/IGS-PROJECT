import { useState, useEffect } from "react";
import { fetchCategorias, fetchLaboratorios, fetchDistribuidores } from "../services/api";

export function useCatalogos() {
  const [categories, setCategories] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [distribuidores, setDistribuidores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [catRes, labRes, distRes] = await Promise.all([
          fetchCategorias(),
          fetchLaboratorios(),
          fetchDistribuidores(),
        ]);
        setCategories(catRes.data);
        setLaboratorios(labRes.data);
        setDistribuidores(distRes.data);
      } catch (err) {
        setError("Error cargando los catálogos");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  return {
    categories,
    laboratorios,
    distribuidores,
    loading,
    error,
  };
}
