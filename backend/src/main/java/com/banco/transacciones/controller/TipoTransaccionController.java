package com.banco.transacciones.controller;


import com.banco.transacciones.entity.TipoTransaccion;
import com.banco.transacciones.service.TipoTransaccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-transacciones")
@CrossOrigin(origins = "http://localhost:5173")


public class TipoTransaccionController {
    private final TipoTransaccionService service;

    public TipoTransaccionController(TipoTransaccionService service){
        this.service = service;
    }

    @GetMapping
    public List<TipoTransaccion> listar(){
        return service.listar();
    }

    @GetMapping("/{id}")
    public TipoTransaccion obtener(@PathVariable Integer id){
        return service.obtener(id);
    }
    @PostMapping
    public  ResponseEntity<TipoTransaccion> crear(@RequestBody TipoTransaccion t){
        return ResponseEntity.status(201).body(service.crear(t));
    }
    @PutMapping("/{id}")
    public TipoTransaccion actualizar(@PathVariable Integer id, @RequestBody TipoTransaccion t){
        return service.actualizar(id, t);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id){
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
