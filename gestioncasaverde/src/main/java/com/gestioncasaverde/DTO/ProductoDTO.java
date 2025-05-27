package com.gestioncasaverde.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductoDTO {
    private Integer id;
    private String nombre;
    private String codigo;
    private SimpleEntidad categoria;
    private SimpleEntidad laboratorio;
    private SimpleEntidad distribuidor;
    private String registroSanitario;
    private Integer stock;
    private BigDecimal precioUnitario;

    @Data
    public static class SimpleEntidad {
        private Integer id;
        private String nombre; // opcional
    }
}
