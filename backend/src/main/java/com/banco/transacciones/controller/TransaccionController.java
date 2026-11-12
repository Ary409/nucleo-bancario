package com.banco.transacciones.controller;


import com.banco.transacciones.dto.ReporteTransaccion;
import com.banco.transacciones.entity.Transaccion;
import com.banco.transacciones.service.TransaccionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transacciones")
@CrossOrigin(origins = "http://localhost:5173")
public class TransaccionController {
    private final TransaccionService service;
    public TransaccionController(TransaccionService service){
        this.service = service;
    }


    //CRUD

    @GetMapping
    public List<Transaccion> listar(){
        return service.listar();
    }
    @GetMapping("/{id}")
    public Transaccion obtener(@PathVariable Integer id){
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    public Transaccion actualizar(@PathVariable Integer id, @RequestBody Transaccion t){
        return service.actualizar(id, t);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        service.eliminar(id);
    }

    //Registro de transacciom
    @PostMapping
    public ResponseEntity<Transaccion> registrarTransaccion(@RequestBody Transaccion transaccion){
        return ResponseEntity.status(201).body(service.crear(transaccion));
    }
    @GetMapping("/reporte")
    public List<ReporteTransaccion> reporte(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return service.reportePorFecha(fecha);
    }
}
