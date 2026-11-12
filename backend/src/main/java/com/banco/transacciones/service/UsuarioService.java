package com.banco.transacciones.service;


import com.banco.transacciones.entity.Usuario;
import com.banco.transacciones.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder){
        this.repository= repository;
        this.passwordEncoder = passwordEncoder;
    }
    public List<Usuario> listar(){
        return repository.findAll();
    }

    public Usuario obtener(Integer id){
        return repository.findById(id)
                .orElseThrow(()->new RuntimeException("Usuario no encontrado"));
    }

    public Usuario crear(Usuario u) {
        u.setPasswordUsuario(passwordEncoder.encode(u.getPasswordUsuario())); // hashea
        u.setFechaRegistro(LocalDateTime.now());
        u.setActivo(true);
        return repository.save(u);
    }
    public Usuario actualizar(Integer id, Usuario datos) {
        Usuario existente = obtener(id);
        existente.setCodigoUsuario(datos.getCodigoUsuario());
        existente.setNombreUsuario(datos.getNombreUsuario());
        // Solo cambia la contraseña si mandaron una nueva (no vacía)
        if (datos.getPasswordUsuario() != null && !datos.getPasswordUsuario().isBlank()) {
            existente.setPasswordUsuario(passwordEncoder.encode(datos.getPasswordUsuario()));
        }
        existente.setFechaModificado(LocalDateTime.now());
        return repository.save(existente);
    }
    public void eliminar(Integer id){
        repository.deleteById(id);
    }

}
