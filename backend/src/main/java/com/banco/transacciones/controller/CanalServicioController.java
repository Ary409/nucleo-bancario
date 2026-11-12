package com.banco.transacciones.controller;


import com.banco.transacciones.entity.CanalServicio;
import com.banco.transacciones.service.CanalServicioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/canal-servicio")
@CrossOrigin(origins = "http://localhost:5173")
public class CanalServicioController {
    private final CanalServicioService service;

    public CanalServicioController(CanalServicioService service){
        this.service = service;
    }

    @GetMapping
    public List<CanalServicio> listar(){
        return service.listar();
    }
    @GetMapping("/{id}")
    public CanalServicio obtener(@PathVariable Integer id){
        return service.obtener(id);
    }

    @PostMapping("/{id}")
    public ResponseEntity<CanalServicio> crear(CanalServicio c){
        return ResponseEntity.status(201).body(service.crear(c));
    }

    @PutMapping("/{id}")
    public CanalServicio actualizar(@PathVariable Integer id, @RequestBody CanalServicio c){
        return service.actualizar(id , c);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        service.eliminar(id);
    }
}
