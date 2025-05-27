package com.gestioncasaverde.controller;

import com.gestioncasaverde.DTO.MovimientoInventarioDTO;
import com.gestioncasaverde.model.MovimientoInventario;
import com.gestioncasaverde.model.Producto;
import com.gestioncasaverde.model.TipoMovimiento;
import com.gestioncasaverde.model.Usuario;
import com.gestioncasaverde.service.MovimientoService;
import com.gestioncasaverde.service.ProductoService;
import com.gestioncasaverde.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
@RestController
@RequestMapping("/api/movimientos")
@RequiredArgsConstructor
public class MovimientoController {

    private final MovimientoService movimientoService;
    private final UsuarioService usuarioService;
    private final ProductoService productoService;

    @GetMapping
    public List<MovimientoInventario> listarTodos() {
        return movimientoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovimientoInventario> getPorId(@PathVariable Integer id) {
        MovimientoInventario mov = movimientoService.buscarPorId(id);
        return ResponseEntity.ok(mov);
    }

    @GetMapping("/producto/{productoId}")
    public List<MovimientoInventario> getPorProducto(@PathVariable Integer productoId) {
        return movimientoService.porProducto(productoId);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<MovimientoInventario> getPorUsuario(@PathVariable Integer usuarioId) {
        return movimientoService.porUsuario(usuarioId);
    }

    @GetMapping("/tipo/{tipo}")
    public List<MovimientoInventario> getPorTipo(@PathVariable TipoMovimiento tipo) {
        return movimientoService.porTipo(tipo);
    }

    @GetMapping("/fechas")
    public List<MovimientoInventario> getEntreFechas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime hasta) {
        return movimientoService.entreFechas(desde, hasta);
    }

    @PostMapping
    public ResponseEntity<MovimientoInventario> crearMovimiento(@Valid @RequestBody MovimientoInventarioDTO dto) {
        // Buscar entidades relacionadas
        Producto producto = productoService.buscarPorId(dto.getProductoId());
        Usuario usuario = usuarioService.buscarPorId(dto.getUsuarioId());

        MovimientoInventario mov = new MovimientoInventario();
        mov.setProducto(producto);
        mov.setTipo(dto.getTipo());
        mov.setCantidad(dto.getCantidad());
        mov.setUsuario(usuario);
        mov.setObservaciones(dto.getObservaciones());
        mov.setFecha(dto.getFecha()); // puede ser null

        MovimientoInventario creado = movimientoService.registrarMovimiento(mov);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

}
