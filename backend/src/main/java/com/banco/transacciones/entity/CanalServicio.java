package com.banco.transacciones.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "canal_servicio", schema = "parametros")
public class CanalServicio {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_canal_servicio")
    private Integer idCanalServicio;
    @Column(name =  "codigo_canal_servicio", nullable = false, unique = true, length = 20)
    private String codigoCanalServicio;

    @Column(name = "nombre_canal_servicio", nullable = false)
    private String nombreCanalServicio;
    @Column(name = "fecha_registro" , nullable = false)
    private LocalDateTime fechaRegistro;
    @Column(name = "fecha_modificado", nullable = false)
    private LocalDateTime fechaModificacion;
    @Column(name = "id_usuario", nullable = false)
    private Integer idUsuario;

    public Integer getIdCanalServicio() {
        return idCanalServicio;
    }

    public void setIdCanalServicio(Integer idCanalServicio) {
        this.idCanalServicio = idCanalServicio;
    }

    public String getCodigoCanalServicio() {
        return codigoCanalServicio;
    }

    public void setCodigoCanalServicio(String codigoCanalServicio) {
        this.codigoCanalServicio = codigoCanalServicio;
    }

    public String getNombreCanalServicio() {
        return nombreCanalServicio;
    }

    public void setNombreCanalServicio(String nombreCanalServicio) {
        this.nombreCanalServicio = nombreCanalServicio;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public LocalDateTime getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(LocalDateTime fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public Integer getIdUsusario() {
        return idUsuario;
    }

    public void setIdUsusario(Integer idUsusario) {
        this.idUsuario = idUsusario;
    }
}
