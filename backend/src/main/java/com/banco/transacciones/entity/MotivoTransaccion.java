package com.banco.transacciones.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "motivo_transaccion", schema = "parametros")

public class MotivoTransaccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_motivo_transaccion")
    private Integer idMotivoTransaccion;

    @Column(name = "codigo_motivo_transaccion")
    private String codigoMotivoTransaccion;

    @Column(name = "nombre_motivo_transaccion")
    private String nombreMotivoTransaccion;
    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;
    @Column(name = "fecha_modificado")
    private LocalDateTime fechaModificado;
    @Column(name = "id_tipo_transaccion")
    private Integer idTipoTransaccion;
    @Column(name = "id_usuario")
    private Integer idUsuario;

    public Integer getIdMotivoTransaccion() {
        return idMotivoTransaccion;
    }

    public void setIdMotivoTransaccion(Integer idMotivoTransaccion) {
        this.idMotivoTransaccion = idMotivoTransaccion;
    }

    public String getCodigoMotivoTransaccion() {
        return codigoMotivoTransaccion;
    }

    public void setCodigoMotivoTransaccion(String codigoMotivoTransaccion) {
        this.codigoMotivoTransaccion = codigoMotivoTransaccion;
    }

    public String getNombreMotivoTransaccion() {
        return nombreMotivoTransaccion;
    }

    public void setNombreMotivoTransaccion(String nombreMotivoTransaccion) {
        this.nombreMotivoTransaccion = nombreMotivoTransaccion;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public LocalDateTime getFechaModificado() {
        return fechaModificado;
    }

    public void setFechaModificado(LocalDateTime fechaModificado) {
        this.fechaModificado = fechaModificado;
    }

    public Integer getIdTipoTransaccion() {
        return idTipoTransaccion;
    }

    public void setIdTipoTransaccion(Integer idTipoTransaccion) {
        this.idTipoTransaccion = idTipoTransaccion;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

}
