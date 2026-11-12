package com.banco.transacciones.service;


import com.banco.transacciones.entity.Cliente;
import com.banco.transacciones.repository.ClienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;
    public ClienteService(ClienteRepository repository){
        this.repository =repository;
    }

    public List<Cliente> listar(){
        return repository.findAll();
    }
    public Cliente obtener(Integer id){
        return repository.findById(id)
                .orElseThrow(()->new RuntimeException("Ciente no encontrado"));
    }
    public Cliente crear(Cliente c){
        c.setFechaRegistro(LocalDateTime.now());
        c.setIdusuario(1);
        return repository.save(c);
    }
    public Cliente actualizar(Integer id, Cliente datos){
        Cliente existente = obtener(id);
        existente.setCodigoCliente(datos.getCodigoCliente());
        existente.setNombreCliente(datos.getNombreCliente());
        existente.setFechaModificado(LocalDateTime.now());
        return repository.save(existente);
    }
    public void eliminar(Integer id){
        repository.deleteById(id);
    }
}
