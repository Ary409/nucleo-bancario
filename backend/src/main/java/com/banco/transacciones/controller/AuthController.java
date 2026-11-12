package com.banco.transacciones.controller;

import com.banco.transacciones.dto.LoginRequest;
import com.banco.transacciones.dto.LoginResponse;
import com.banco.transacciones.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getCodigoUsuario(), request.getPassword());
        return new LoginResponse(token);
    }
}