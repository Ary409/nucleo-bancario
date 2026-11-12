package com.banco.transacciones.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "agencias", schema = "general")
public class Agencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_agencia")
    private Integer idAgencia;

    @Column(name = "codigo_agencia")
    private String codigoAgencia;

    @Column(name = "nombre_agencia")
    private String nombreAgencia;

    @Column(name = "direccion_agencia")
    private String direccionAgencia;

    @Column(name = "telefono_agencia")
    private String telefonoAgencia;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificado;

    @Column(name = "id_canal_servicio")
    private Integer idCanalServicio;

    @Column(name = "id_usuario")
    private Integer idUsuario;



    public Integer getIdAgencia() {
        return idAgencia;
    }

    public void setIdAgencia(Integer idAgencia) {
        this.idAgencia = idAgencia;
    }

    public String getCodigoAgencia() {
        return codigoAgencia;
    }

    public void setCodigoAgencia(String codigoAgencia) {
        this.codigoAgencia = codigoAgencia;
    }

    public String getNombreAgencia() {
        return nombreAgencia;
    }

    public void setNombreAgencia(String nombreAgencia) {
        this.nombreAgencia = nombreAgencia;
    }

    public String getDireccionAgencia() {
        return direccionAgencia;
    }

    public void setDireccionAgencia(String direccionAgencia) {
        this.direccionAgencia = direccionAgencia;
    }

    public String getTelefonoAgencia() {
        return telefonoAgencia;
    }

    public void setTelefonoAgencia(String telefonoAgencia) {
        this.telefonoAgencia = telefonoAgencia;
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

    public Integer getIdCanalServicio() {
        return idCanalServicio;
    }

    public void setIdCanalServicio(Integer idCanalServicio) {
        this.idCanalServicio = idCanalServicio;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }
}
