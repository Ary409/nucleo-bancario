package com.banco.transacciones.dto;

public class LoginResponse {

    private String token;

    // Constructor que recibe el token
    public LoginResponse(String token) {
        this.token = token;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}