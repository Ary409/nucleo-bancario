package com.banco.transacciones.controller;


import com.banco.transacciones.entity.MotivoTransaccion;
import com.banco.transacciones.service.MotivoTransaccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motivo-transaccion")
@CrossOrigin(origins = "http://localhost:5173")

public class MotivoTransaccionController {

    private final MotivoTransaccionService service;

    public MotivoTransaccionController(MotivoTransaccionService service){
        this.service = service;
    }

    @GetMapping
    public List<MotivoTransaccion> listar(Integer id){
        return service.listar();
    }

    @GetMapping("/{id}")
    public MotivoTransaccion obtener(@PathVariable Integer id){
        return service.obtener(id);
    }
    @PostMapping
    public ResponseEntity<MotivoTransaccion> crear(MotivoTransaccion m){
        return ResponseEntity.status(201).body(service.crear(m));
    }
    @PutMapping("/{id}")
    public MotivoTransaccion actualizar(@PathVariable Integer id, @RequestBody MotivoTransaccion m){
        return service.actualizar(id, m);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        service.eliminar(id);
    }
}
