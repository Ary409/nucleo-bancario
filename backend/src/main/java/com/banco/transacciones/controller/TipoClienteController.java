package com.banco.transacciones.controller;


import com.banco.transacciones.entity.TipoCliente;
import com.banco.transacciones.service.TipoClienteService;
import org.aspectj.lang.annotation.DeclareError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-cliente")
@CrossOrigin(origins = "http://localhost:5173")
public class TipoClienteController {
    private final TipoClienteService service;

    public TipoClienteController(TipoClienteService service){
        this.service = service;

    }

    @GetMapping
    public List<TipoCliente> listar(){
        return service.listar();
    }

    @GetMapping("/{id}")
    public TipoCliente obtener(@PathVariable Integer id){
        return service.obtener(id);
    }
    @PostMapping
    public ResponseEntity<TipoCliente> crear(@RequestBody TipoCliente t){
        return ResponseEntity.status(201).body(service.crear(t));
    }
    @PutMapping("/{id}")
    public TipoCliente actualizar(@PathVariable Integer id , @RequestBody TipoCliente t){
        return service.actualizar(id, t);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id){
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

}
