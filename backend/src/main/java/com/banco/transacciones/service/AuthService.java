package com.banco.transacciones.service;

import com.banco.transacciones.entity.Usuario;
import com.banco.transacciones.repository.UsuarioRepository;
import com.banco.transacciones.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UsuarioRepository usuariosRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuariosRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.usuariosRepository = usuariosRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(String codigoUsuario, String password) {
        //  Buscar el usuario
        Usuario usuario = usuariosRepository.findByCodigoUsuario(codigoUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario o contraseña incorrectos"));

        //  Verificar que esté activo
        if (Boolean.FALSE.equals(usuario.getActivo())) {
            throw new RuntimeException("Usuario inactivo");
        }

        //  Verificar contraseña contra el HASH
        if (!passwordEncoder.matches(password, usuario.getPasswordUsuario())) {
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }

        //  Actualizar última conexión (lo que pide la prueba)
        usuario.setUltimaConexion(LocalDateTime.now());
        usuariosRepository.save(usuario);

        //  Generar y devolver el token
        return jwtService.generarToken(usuario.getCodigoUsuario());
    }
}