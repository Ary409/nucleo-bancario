package com.banco.transacciones.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tipo_transaccion", schema = "parametros")
public class TipoTransaccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_transaccion")
    private Integer idTipoTransaccion;

    @Column(name = "codigo_tipo_movimiento")
    private String codigoTipoMovimiento;

    @Column(name = "codigo_tipo_transaccion")
    private String codigoTipoTransaccion;

    @Column(name = "nombre_tipo_transaccion")
    private String nombreTipoTransaccion;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_modificado")
    private LocalDateTime fechaModificado;
    @Column(name = "id_usuario")
    private Integer idUduario;

    public Integer getIdTipoTransaccion() {
        return idTipoTransaccion;
    }

    public void setIdTipoTransaccion(Integer idTipoTransaccion) {
        this.idTipoTransaccion = idTipoTransaccion;
    }

    public String getCodigoTipoMovimiento() {
        return codigoTipoMovimiento;
    }

    public void setCodigoTipoMovimiento(String codigoTipoMovimiento) {
        this.codigoTipoMovimiento = codigoTipoMovimiento;
    }

    public String getCodigoTipoTransaccion() {
        return codigoTipoTransaccion;
    }

    public void setCodigoTipoTransaccion(String codigoTipoTransaccion) {
        this.codigoTipoTransaccion = codigoTipoTransaccion;
    }

    public String getNombreTipoTransaccion() {
        return nombreTipoTransaccion;
    }

    public void setNombreTipoTransaccion(String nombreTipoTransaccion) {
        this.nombreTipoTransaccion = nombreTipoTransaccion;
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

    public Integer getIdUduario() {
        return idUduario;
    }

    public void setIdUduario(Integer idUduario) {
        this.idUduario = idUduario;
    }
}
