package com.gestioncasaverde.DTO;

import com.gestioncasaverde.model.TipoMovimiento;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MovimientoInventarioDTO {

    @NotNull(message = "El producto es obligatorio")
    private Integer productoId;

    @NotNull(message = "El tipo de movimiento es obligatorio")
    private TipoMovimiento tipo;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;

    @NotNull(message = "El usuario es obligatorio")
    private Integer usuarioId;

    private String observaciones;

    private LocalDateTime fecha; // Opcional
}
