package com.banco.transacciones.service;


import com.banco.transacciones.entity.TipoCliente;
import com.banco.transacciones.entity.TipoTransaccion;
import com.banco.transacciones.repository.TipoClienteRepository;
import com.banco.transacciones.repository.TipoTransaccionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TipoTransaccionService {
    private final TipoTransaccionRepository repository;

    public TipoTransaccionService(TipoTransaccionRepository repository){
        this.repository = repository;
    }

    public List<TipoTransaccion> listar(){
        return repository.findAll();
    }

    public TipoTransaccion obtener(Integer id){
        return repository.findById(id)
                .orElseThrow(()->new RuntimeException("Transaccion no encontrada"));
    }

    public TipoTransaccion crear(TipoTransaccion t){
        t.setFechaRegistro(LocalDateTime.now());
        t.setIdUduario(1);
        return repository.save(t);
    }
    public TipoTransaccion actualizar(Integer id, TipoTransaccion datos){
        TipoTransaccion existente = obtener(id);
        existente.setCodigoTipoTransaccion(datos.getCodigoTipoTransaccion());
        existente.setNombreTipoTransaccion(datos.getNombreTipoTransaccion());
        existente.setFechaModificado(LocalDateTime.now());
        return repository.save(existente);
    }
    public void eliminar(Integer id){
        repository.deleteById(id);
    }

}
