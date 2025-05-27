package com.gestioncasaverde.controller;

import com.gestioncasaverde.DTO.ProductoDTO;
import com.gestioncasaverde.model.Categoria;
import com.gestioncasaverde.model.Distribuidor;
import com.gestioncasaverde.model.Laboratorio;
import com.gestioncasaverde.model.Producto;
import com.gestioncasaverde.service.CategoriaService;
import com.gestioncasaverde.service.DistribuidorService;
import com.gestioncasaverde.service.LaboratorioService;
import com.gestioncasaverde.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;
    private final CategoriaService categoriaService;
    private final LaboratorioService laboratorioService;
    private final DistribuidorService distribuidorService;

    @GetMapping
    public List<Producto> getAll() {
        return productoService.listar();
    }

    @GetMapping("/search")
    public ResponseEntity<Producto> findByCodigo(@RequestParam String codigo) {
        return ResponseEntity.ok(productoService.buscarPorCodigo(codigo));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Producto> create(@Valid @RequestBody ProductoDTO dto) {
        if (dto.getCategoria() == null || dto.getCategoria().getId() == null) {
            throw new RuntimeException("Categoría es obligatoria");
        }
        if (dto.getLaboratorio() == null || dto.getLaboratorio().getId() == null) {
            throw new RuntimeException("Laboratorio es obligatorio");
        }
        if (dto.getDistribuidor() == null || dto.getDistribuidor().getId() == null) {
            throw new RuntimeException("Distribuidor es obligatorio");
        }

        Categoria categoria = categoriaService.buscarPorId(dto.getCategoria().getId());

        Laboratorio laboratorio = laboratorioService.buscarPorId(dto.getLaboratorio().getId());

        Distribuidor distribuidor = distribuidorService.buscarPorId(dto.getDistribuidor().getId());

        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setCodigo(dto.getCodigo());
        producto.setCategoria(categoria);
        producto.setLaboratorio(laboratorio);
        producto.setDistribuidor(distribuidor);
        producto.setRegistroSanitario(dto.getRegistroSanitario());
        producto.setStock(dto.getStock());
        producto.setPrecioUnitario(dto.getPrecioUnitario());

        Producto creado = productoService.crear(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Producto> update(@PathVariable Integer id, @Valid @RequestBody ProductoDTO dto) {
        Producto productoExistente = productoService.buscarPorId(id);

        Categoria categoria = categoriaService.buscarPorId(dto.getCategoria().getId());

        Laboratorio laboratorio = laboratorioService.buscarPorId(dto.getLaboratorio().getId());

        Distribuidor distribuidor = distribuidorService.buscarPorId(dto.getDistribuidor().getId());

        productoExistente.setNombre(dto.getNombre());
        productoExistente.setCodigo(dto.getCodigo());
        productoExistente.setCategoria(categoria);
        productoExistente.setLaboratorio(laboratorio);
        productoExistente.setDistribuidor(distribuidor);
        productoExistente.setRegistroSanitario(dto.getRegistroSanitario());
        productoExistente.setStock(dto.getStock() != null ? dto.getStock() : 0);
        productoExistente.setPrecioUnitario(dto.getPrecioUnitario());

        Producto actualizado = productoService.crear(productoExistente);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
