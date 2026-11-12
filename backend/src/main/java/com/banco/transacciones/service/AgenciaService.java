package com.banco.transacciones.service;


import com.banco.transacciones.entity.Agencia;
import com.banco.transacciones.repository.AgenciaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgenciaService {

    private final AgenciaRepository repository;
    public AgenciaService(AgenciaRepository repository){
        this.repository = repository;
    }

    public List<Agencia> listar(){
        return repository.findAll();
    }
    public Agencia obtener(Integer id){
        return repository.findById(id)
                .orElseThrow(()->new RuntimeException("Agencia no encontrada"));
    }

    public Agencia crear(Agencia a){
        a.setFechaRegistro(LocalDateTime.now());
        a.setIdUsuario(1);
        return repository.save(a);
    }
    public Agencia actualizar(Integer id, Agencia datos){
        Agencia exitente = obtener(id);
        exitente.setCodigoAgencia(datos.getCodigoAgencia());
        exitente.setNombreAgencia(datos.getNombreAgencia());
        exitente.setFechaModificado(LocalDateTime.now());
        return repository.save(exitente);
    }
    public void eliminar(Integer id){
        repository.deleteById(id);
    }

}
