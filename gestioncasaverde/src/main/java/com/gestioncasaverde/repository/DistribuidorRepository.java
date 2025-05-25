package com.gestioncasaverde.repository;

import com.gestioncasaverde.model.Distribuidor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DistribuidorRepository extends JpaRepository<Distribuidor, Integer> {
    Optional<Distribuidor> findByNombre(String nombre);
}
