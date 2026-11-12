package com.banco.transacciones.service;

import com.banco.transacciones.entity.CanalServicio;
import com.banco.transacciones.repository.CanalServicioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;

@Service
public class CanalServicioService {
    private final CanalServicioRepository repository;

    public CanalServicioService(CanalServicioRepository repository) {
        this.repository = repository;
    }

    public List<CanalServicio> listar() {
        return repository.findAll();
    }

    public CanalServicio obtener(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado "));
    }

    public CanalServicio crear(CanalServicio c) {
        c.setFechaRegistro(LocalDateTime.now());
        c.setIdUsusario(1);
        return repository.save(c);
    }

    public CanalServicio actualizar(Integer id, CanalServicio datos) {
        CanalServicio existente = obtener(id);
        existente.setCodigoCanalServicio(datos.getCodigoCanalServicio());
        existente.setNombreCanalServicio(datos.getNombreCanalServicio());
        existente.setFechaModificacion(LocalDateTime.now());
        return repository.save(existente);
    }
    public void eliminar(Integer id){
        repository.deleteById(id);
    }
}
