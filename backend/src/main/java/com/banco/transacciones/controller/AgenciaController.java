package com.banco.transacciones.controller;


import com.banco.transacciones.entity.Agencia;
import com.banco.transacciones.service.AgenciaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agencias")
@CrossOrigin(origins = "http://localhost:5173")
public class AgenciaController {

    private final AgenciaService service;
    public AgenciaController(AgenciaService service){
        this.service = service;
    }


    @GetMapping
    public List<Agencia> listar(){
        return service.listar();
    }
    @GetMapping("/{id}")
    public Agencia obtener(@PathVariable Integer id){
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<Agencia> crear(@RequestBody Agencia a){
        return ResponseEntity.status(201).body(service.crear(a));

    }
    @PutMapping("/{id}")
    public Agencia actualizar(@PathVariable Integer id, @RequestBody Agencia a){
        return service.actualizar(id, a);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        service.eliminar(id);
    }
}
