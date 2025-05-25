package com.gestioncasaverde.controller;

import com.gestioncasaverde.model.Distribuidor;
import com.gestioncasaverde.service.DistribuidorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/distribuidores")
@RequiredArgsConstructor
public class DistribuidorController {
    private final DistribuidorService distribuidorService;

    @GetMapping
    public List<Distribuidor> getAll() {
        return distribuidorService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Distribuidor> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(distribuidorService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Distribuidor> create(@Valid @RequestBody Distribuidor distribuidor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(distribuidorService.crear(distribuidor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Distribuidor> update(@PathVariable Integer id, @Valid @RequestBody Distribuidor distribuidor) {
        return ResponseEntity.ok(distribuidorService.actualizar(id, distribuidor));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        distribuidorService.eliminar(id);
    }
}
