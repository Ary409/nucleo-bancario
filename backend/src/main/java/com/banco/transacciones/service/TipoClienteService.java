package com.banco.transacciones.service;


import com.banco.transacciones.entity.TipoCliente;
import com.banco.transacciones.repository.TipoClienteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TipoClienteService {
    private final TipoClienteRepository repository;


    // Inyección por constructor
    public TipoClienteService(TipoClienteRepository repository){
        this.repository = repository;
    }
    //lista de cliente
    public List<TipoCliente> listar(){
        return repository.findAll();
    }
    //buscar por id
    public TipoCliente obtener(Integer id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("No exite el cliente id= " + id));
    }
    //crear usuario
    public TipoCliente crear(TipoCliente t){
        t.setFechaRegistro(LocalDateTime.now());
        t.setIdUsuario(1);
        return repository.save(t);
    }

    //actualizar usuario le pasamos el id y los datos
    public TipoCliente actualizar(Integer id , TipoCliente datos){
        TipoCliente existente = obtener(id);
        existente.setCodigoTipoCliente(datos.getCodigoTipoCliente());
        existente.setNombreTipoCliente(datos.getNombreTipoCliente());
        existente.setFechaModificado(LocalDateTime.now());
        return repository.save(existente);
    }
    public void eliminar(Integer id){
        repository.deleteById(id);
    }



}
