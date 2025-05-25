package com.gestioncasaverde.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categoria")
@Data @NoArgsConstructor @AllArgsConstructor
public class Categoria {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String nombre; // Circulatorio, Respiratorio, Hormonal...
}