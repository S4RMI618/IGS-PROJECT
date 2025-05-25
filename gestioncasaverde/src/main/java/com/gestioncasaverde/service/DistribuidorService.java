package com.gestioncasaverde.service;

import com.gestioncasaverde.model.Distribuidor;
import com.gestioncasaverde.repository.DistribuidorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DistribuidorService {
    private final DistribuidorRepository repo;

    public List<Distribuidor> listar() {
        return repo.findAll();
    }

    public Distribuidor buscarPorId(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Distribuidor no encontrado: " + id));
    }

    public Distribuidor crear(Distribuidor d) {
        return repo.save(d);
    }

    public Distribuidor actualizar(Integer id, Distribuidor datos) {
        Distribuidor d = buscarPorId(id);
        d.setNombre(datos.getNombre());
        return repo.save(d);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}
