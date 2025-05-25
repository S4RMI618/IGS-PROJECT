package com.gestioncasaverde.repository;

import com.gestioncasaverde.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    /**
     * Buscar producto por código único.
     */
    Optional<Producto> findByCodigo(String codigo);

    /**
     * Listar productos de una categoría concreta.
     */
    List<Producto> findByCategoriaNombre(String nombreCategoria);

    /**
     * Listar productos de un laboratorio concreto.
     */
    List<Producto> findByLaboratorioNombre(String nombreLaboratorio);

    /**
     * Listar productos de un distribuidor concreto.
     */
    List<Producto> findByDistribuidorNombre(String nombreDistribuidor);

    /**
     * Listar productos con stock menor al valor indicado (alertas de stock bajo).
     */
    List<Producto> findByStockLessThan(Integer nivel);
}