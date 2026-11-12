package com.banco.transacciones.repository;

import com.banco.transacciones.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario , Integer> {
    Optional<Usuario> findByCodigoUsuario(String codigoUssuario); //login obtener el codigo de usuario que es unico

}
