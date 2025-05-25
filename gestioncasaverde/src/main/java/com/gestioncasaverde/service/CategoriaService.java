package com.gestioncasaverde.service;

import com.gestioncasaverde.model.Categoria;
import com.gestioncasaverde.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    private final CategoriaRepository repo;

    public List<Categoria> listar() {
        return repo.findAll();
    }

    public Categoria buscarPorId(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada: " + id));
    }

    public Categoria crear(Categoria c) {
        return repo.save(c);
    }

    public Categoria actualizar(Integer id, Categoria datos) {
        Categoria c = buscarPorId(id);
        c.setNombre(datos.getNombre());
        return repo.save(c);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}