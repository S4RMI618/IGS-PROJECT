package com.gestioncasaverde.repository;

import com.gestioncasaverde.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsername(String username);
    List<Usuario> findByActivoTrue();
    List<Usuario> findByRolNombre(String rolNombre);
}