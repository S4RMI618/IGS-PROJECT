package com.gestioncasaverde.repository;

import com.gestioncasaverde.model.MovimientoInventario;
import com.gestioncasaverde.model.TipoMovimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface MovimientoRepository extends JpaRepository<MovimientoInventario, Integer> {
    /**
     * Movimientos de un producto concreto.
     */
    List<MovimientoInventario> findByProductoId(Integer productoId);

    /**
     * Movimientos realizados por un usuario concreto.
     */
    List<MovimientoInventario> findByUsuarioId(Integer usuarioId);

    /**
     * Movimientos por tipo (ENTRADA o SALIDA).
     */
    List<MovimientoInventario> findByTipo(TipoMovimiento tipo);

    /**
     * Movimientos en un rango de fechas.
     */
    List<MovimientoInventario> findByFechaBetween(LocalDateTime desde, LocalDateTime hasta);
}