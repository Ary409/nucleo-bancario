package com.banco.transacciones.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Llave duplicada, FK inválida, campo NOT NULL... (errores de integridad de la BD)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> integridad(DataIntegrityViolationException ex) {
        String mensaje = "No se pudo completar la operación: violación de integridad de datos";

        // Detecta el caso más común (código duplicado) para dar un mensaje claro
        String causa = ex.getMostSpecificCause().getMessage();
        if (causa != null && causa.contains("duplicate key")) {
            mensaje = "Ya existe un registro con ese código o identificación";
        } else if (causa != null && causa.contains("foreign key")) {
            mensaje = "El registro hace referencia a un dato que no existe";
        } else if (causa != null && causa.contains("not-null")) {
            mensaje = "Faltan campos obligatorios";
        }

        return construir(HttpStatus.CONFLICT, mensaje); // 409
    }

    // "No existe X id=..." que lanzas en los services con orElseThrow
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> runtime(RuntimeException ex) {
        return construir(HttpStatus.BAD_REQUEST, ex.getMessage()); // 400
    }

    // Helper que arma la respuesta JSON uniforme
    private ResponseEntity<Map<String, Object>> construir(HttpStatus estado, String mensaje) {
        Map<String, Object> cuerpo = Map.of(
                "timestamp", LocalDateTime.now().toString(),
                "estado", estado.value(),
                "error", mensaje
        );
        return ResponseEntity.status(estado).body(cuerpo);
    }
}