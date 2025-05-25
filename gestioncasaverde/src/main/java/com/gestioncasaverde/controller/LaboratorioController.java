package com.gestioncasaverde.controller;

import com.gestioncasaverde.model.Laboratorio;
import com.gestioncasaverde.service.LaboratorioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/laboratorios")
@RequiredArgsConstructor
public class LaboratorioController {
    private final LaboratorioService laboratorioService;

    @GetMapping
    public List<Laboratorio> getAll() {
        return laboratorioService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Laboratorio> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(laboratorioService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Laboratorio> create(@Valid @RequestBody Laboratorio laboratorio) {
        return ResponseEntity.status(HttpStatus.CREATED).body(laboratorioService.crear(laboratorio));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Laboratorio> update(@PathVariable Integer id, @Valid @RequestBody Laboratorio laboratorio) {
        return ResponseEntity.ok(laboratorioService.actualizar(id, laboratorio));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        laboratorioService.eliminar(id);
    }
}
