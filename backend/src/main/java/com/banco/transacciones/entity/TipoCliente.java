package com.banco.transacciones.entity;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tipo_cliente", schema = "parametros")

public class TipoCliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_cliente")
    private Integer idTipoCliente;

    @Column(name = "codigo_tipo_cliente", nullable = false, unique = true, length = 20 )
    private String codigoTipoCliente;

    @Column(name = "nombre_tipo_cliente", nullable = false)
    private String nombreTipoCliente;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_modificado", nullable = false)
    private LocalDateTime fechaModificado;

    @Column(name = "id_usuario", nullable = false)
    private Integer idUsuario;


    public Integer getIdTipoCliente() {
        return idTipoCliente;
    }

    public void setIdTipoCliente(Integer idTipoCliente) {
        this.idTipoCliente = idTipoCliente;
    }

    public String getCodigoTipoCliente() {
        return codigoTipoCliente;
    }

    public void setCodigoTipoCliente(String codigoTipoCliente) {
        this.codigoTipoCliente = codigoTipoCliente;
    }

    public String getNombreTipoCliente() {
        return nombreTipoCliente;
    }

    public void setNombreTipoCliente(String nombreTipoCliente) {
        this.nombreTipoCliente = nombreTipoCliente;
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

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

}
