package com.gestioncasaverde.service;

import com.gestioncasaverde.model.Rol;
import com.gestioncasaverde.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RolService {
    private final RolRepository repo;

    public List<Rol> listarTodos() {
        return repo.findAll();
    }

    public Rol buscarPorId(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado: " + id));
    }

    public Rol buscarPorNombre(String nombre) {
        return repo.findByNombre(nombre)
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado: " + nombre));
    }

    public Rol crear(Rol rol) {
        return repo.save(rol);
    }

    public Rol actualizar(Integer id, Rol datos) {
        Rol existente = buscarPorId(id);
        existente.setNombre(datos.getNombre());
        return repo.save(existente);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}
