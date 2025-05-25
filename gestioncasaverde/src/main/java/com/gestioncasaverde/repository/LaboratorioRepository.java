package com.gestioncasaverde.repository;

import com.gestioncasaverde.model.Laboratorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LaboratorioRepository extends JpaRepository<Laboratorio, Integer> {
    Optional<Laboratorio> findByNombre(String nombre);
}