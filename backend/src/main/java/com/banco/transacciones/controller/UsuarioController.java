package com.banco.transacciones.controller;


import com.banco.transacciones.entity.Usuario;
import com.banco.transacciones.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")

public class UsuarioController {
    private final UsuarioService service;
    public UsuarioController(UsuarioService service){
        this.service = service;
    }

    @GetMapping
    public List<Usuario> listar(){
        return service.listar();
    }
    @GetMapping("/{id}")
    public Usuario obtener(@PathVariable Integer id){
        return service.obtener(id);
    }
    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario u){
        return ResponseEntity.status(201).body(service.crear(u));
    }
    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Integer id, @RequestBody Usuario u){
        return service.actualizar(id, u);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id){
        service.eliminar(id);
    }
}
