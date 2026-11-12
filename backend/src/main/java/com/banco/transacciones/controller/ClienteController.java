package com.banco.transacciones.controller;


import com.banco.transacciones.entity.Cliente;
import com.banco.transacciones.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:5173")

public class ClienteController {
    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Cliente> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Cliente obtener(@PathVariable Integer id) {
        return service.obtener(id);
    }

    @PostMapping
    public ResponseEntity<Cliente> crear(@RequestBody Cliente c) {
        return ResponseEntity.status(201).body(service.crear(c));
    }
    @PutMapping("/{id}")
    public Cliente actualizar(@PathVariable Integer id, @RequestBody Cliente c){
        return service.actualizar(id, c);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        service.eliminar(id);
    }
}
