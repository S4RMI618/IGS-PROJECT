package com.gestioncasaverde.service;

import com.gestioncasaverde.model.Usuario;
import com.gestioncasaverde.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository repo;
    /*private final PasswordEncoder encoder;*/

    public List<Usuario> listarActivos() {
        return repo.findByActivoTrue();
    }

    public Usuario buscarPorId(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado: " + id));
    }

    public Usuario buscarPorUsername(String username) {
        return repo.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado: " + username));
    }

    public Usuario crear(Usuario u) {
        /*u.setPassword( encoder.encode(u.getPassword()) );*/
        return repo.save(u);
    }

    public Usuario actualizar(Integer id, Usuario datos) {
        Usuario u = buscarPorId(id);
        u.setUsername(datos.getUsername());
        /*if (datos.getPassword() != null && !datos.getPassword().isBlank()) {
            u.setPassword( encoder.encode(datos.getPassword()) );
        }*/
        u.setActivo(datos.isActivo());
        u.setRol(datos.getRol());
        return repo.save(u);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }
}
