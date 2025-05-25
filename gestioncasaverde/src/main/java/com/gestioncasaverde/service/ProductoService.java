package com.gestioncasaverde.service;

import com.gestioncasaverde.model.Producto;
import com.gestioncasaverde.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {
    private final ProductoRepository repo;

    public List<Producto> listar() {
        return repo.findAll();
    }

    public Producto buscarPorId(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + id));
    }

    public Producto crear(Producto p) {
        return repo.save(p);
    }

    public Producto actualizar(Integer id, Producto datos) {
        Producto p = buscarPorId(id);
        p.setNombre(datos.getNombre());
        p.setCodigo(datos.getCodigo());
        p.setCategoria(datos.getCategoria());
        p.setLaboratorio(datos.getLaboratorio());
        p.setDistribuidor(datos.getDistribuidor());
        p.setRegistroSanitario(datos.getRegistroSanitario());
        return repo.save(p);
    }

    @Transactional
    public Producto ajustarStock(Integer id, int cantidadDelta) {
        Producto p = buscarPorId(id);
        int nuevoStock = p.getStock() + cantidadDelta;
        if (nuevoStock < 0) {
            throw new IllegalArgumentException("Stock insuficiente para producto " + id);
        }
        p.setStock(nuevoStock);
        return repo.save(p);
    }

    public void eliminar(Integer id) {
        repo.deleteById(id);
    }

    // Métodos de alerta / filtrado
    public List<Producto> listarPorCategoria(String cat) {
        return repo.findByCategoriaNombre(cat);
    }
    public List<Producto> listarPorLaboratorio(String lab) {
        return repo.findByLaboratorioNombre(lab);
    }
    public List<Producto> listarPorDistribuidor(String dist) {
        return repo.findByDistribuidorNombre(dist);
    }
    public List<Producto> alertasStockBajo(int umbral) {
        return repo.findByStockLessThan(umbral);
    }
    public Producto buscarPorCodigo(String codigo) {
        return repo.findByCodigo(codigo)
                .orElseThrow(() ->
                        new IllegalArgumentException("Producto no encontrado con código: " + codigo)
                );
    }
}
