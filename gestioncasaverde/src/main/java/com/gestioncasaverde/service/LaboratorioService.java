package com.gestioncasaverde.service;

import com.gestioncasaverde.model.Laboratorio;
import com.gestioncasaverde.repository.LaboratorioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LaboratorioService {
    private final LaboratorioRepository repo;

    public List<Laboratorio> listar() {
        return repo.findAll();
    }

    public Laboratorio buscarPorId(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Laboratorio no encontrado: " + id));
    }

    public Laboratorio crear(Laboratorio l) {
        return repo.save(l);
    }

    public Laboratorio actualizar(Integer id, Laboratorio datos) {
        Laboratorio l = buscarPorId(id);
        l.setNombre(datos.getNombre());
        return repo.save(l);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}