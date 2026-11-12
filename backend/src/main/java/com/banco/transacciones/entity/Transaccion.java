package com.banco.transacciones.entity;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacciones", schema = "transaccional")

public class Transaccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transaccion")
    private Integer idTransaccion;
    @Column(name = "fecha_transaccion")
    private LocalDateTime fechaTransaccion;
    @Column(name = "monto_transaccion")
    private BigDecimal montoTransaccion;
    @Column(name = "id_motivo_transaccion")
    private Integer idMotivoTransaccion;
    @Column(name = "id_agencia")
    private Integer idAgencia;
    @Column(name = "id_cliente")
    private  Integer idCliente;
    @Column(name = "id_usuario")
    private Integer idUsuario;




    public Integer getIdTransaccion() {
        return idTransaccion;
    }

    public void setIdTransaccion(Integer idTransaccion) {
        this.idTransaccion = idTransaccion;
    }

    public LocalDateTime getFechaTransaccion() {
        return fechaTransaccion;
    }

    public void setFechaTransaccion(LocalDateTime fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion;
    }

    public BigDecimal getMontoTransaccion() {
        return montoTransaccion;
    }

    public void setMontoTransaccion(BigDecimal montoTransaccion) {
        this.montoTransaccion = montoTransaccion;
    }

    public Integer getIdMotivoTransaccion() {
        return idMotivoTransaccion;
    }

    public void setIdMotivoTransaccion(Integer idMotivoTransaccion) {
        this.idMotivoTransaccion = idMotivoTransaccion;
    }

    public Integer getIdAgencia() {
        return idAgencia;
    }

    public void setIdAgencia(Integer idAgencia) {
        this.idAgencia = idAgencia;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }
}
