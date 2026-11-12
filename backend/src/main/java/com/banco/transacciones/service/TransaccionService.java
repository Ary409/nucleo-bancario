package com.banco.transacciones.service;


import com.banco.transacciones.dto.ReporteTransaccion;
import com.banco.transacciones.entity.Transaccion;
import com.banco.transacciones.repository.TransaccionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransaccionService {

    private final TransaccionRepository repository;

    public TransaccionService(TransaccionRepository repository){
        this.repository = repository;
    }
    public List<Transaccion> listar(){
        return repository.findAll();
    }


    //CRUD

    public Transaccion obtener(Integer id){
        return repository.findById(id)
                .orElseThrow(()-> new RuntimeException("Transaccion no encontrada"));
    }
    public Transaccion crear(Transaccion t){
        t.setFechaTransaccion(LocalDateTime.now());
        t.setIdUsuario(1);
        return repository.save(t);
    }
    public Transaccion actualizar(Integer id, Transaccion datos){
        Transaccion existente = obtener(id);
        existente.setFechaTransaccion(datos.getFechaTransaccion());
        existente.setMontoTransaccion(datos.getMontoTransaccion());
        return repository.save(existente);
    }
    public void eliminar(Integer id){
        repository.deleteById(id);
    }


    //Registro de transacciones
    public Transaccion registrarTransaccion(Transaccion transaccion){
        transaccion.setFechaTransaccion(LocalDateTime.now()); //hora del servido
        transaccion.setIdUsuario(1); //quien hizo la transaccion
        return repository.save(transaccion);
    }
    public List<ReporteTransaccion> reportePorFecha(LocalDate fecha) {
        return repository.obtenerReportePorFecha(fecha);
    }
}

