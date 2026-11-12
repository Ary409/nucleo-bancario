package com.banco.transacciones.service;


import com.banco.transacciones.entity.MotivoTransaccion;
import com.banco.transacciones.repository.MotivoTransaccionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MotivoTransaccionService {
    private final MotivoTransaccionRepository repository;
    public  MotivoTransaccionService(MotivoTransaccionRepository repository){
        this.repository = repository;
    }

    public List<MotivoTransaccion> listar(){
        return repository.findAll();
    }

    public MotivoTransaccion obtener(Integer id){
        return repository.findById(id)
                .orElseThrow(()-> new RuntimeException("Motivo de transaccion no encontrado"));
    }
    public MotivoTransaccion crear(MotivoTransaccion m){
        m.setFechaRegistro(LocalDateTime.now());
        m.setIdUsuario(1);
        return repository.save(m);
    }
    public MotivoTransaccion actualizar(Integer id , MotivoTransaccion datos){
        MotivoTransaccion existente = obtener(id);
        existente.setCodigoMotivoTransaccion(datos.getCodigoMotivoTransaccion());
        existente.setNombreMotivoTransaccion(datos.getNombreMotivoTransaccion());
        existente.setFechaModificado(LocalDateTime.now());
        return repository.save(existente);
    }
    public void eliminar(Integer id){
        repository.deleteById(id);
    }


}
