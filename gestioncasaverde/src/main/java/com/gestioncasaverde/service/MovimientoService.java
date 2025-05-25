package com.gestioncasaverde.service;

import com.gestioncasaverde.model.MovimientoInventario;
import com.gestioncasaverde.model.TipoMovimiento;
import com.gestioncasaverde.repository.MovimientoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovimientoService {
    private final MovimientoRepository repo;
    private final ProductoService productoService;

    public List<MovimientoInventario> listarTodos() {
        return repo.findAll();
    }

    public MovimientoInventario buscarPorId(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Movimiento no encontrado: " + id));
    }

    public List<MovimientoInventario> porProducto(Integer productoId) {
        return repo.findByProductoId(productoId);
    }

    public List<MovimientoInventario> porUsuario(Integer usuarioId) {
        return repo.findByUsuarioId(usuarioId);
    }

    public List<MovimientoInventario> porTipo(TipoMovimiento tipo) {
        return repo.findByTipo(tipo);
    }

    public List<MovimientoInventario> entreFechas(LocalDateTime desde, LocalDateTime hasta) {
        return repo.findByFechaBetween(desde, hasta);
    }

    @Transactional
    public MovimientoInventario registrarMovimiento(MovimientoInventario mov) {
        int delta = mov.getTipo() == TipoMovimiento.ENTRADA
                ? mov.getCantidad()
                : -mov.getCantidad();
        // 1) Ajustar stock
        productoService.ajustarStock(mov.getProducto().getId(), delta);
        // 2) Poner fecha si no vino
        if (mov.getFecha() == null) {
            mov.setFecha(LocalDateTime.now());
        }
        // 3) Guardar movimiento
        return repo.save(mov);
    }
}