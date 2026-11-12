package com.banco.transacciones.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface ReporteTransaccion {
    LocalDateTime getFechaTransaccion();
    String getTipoCliente();
    String getIdentidadCliente();
    String getNombreCliente();
    String getCodigoAgencia();
    String getNombreAgencia();
    String getCanalServicio();
    String getCodigoTransaccion();
    String getNombreTransaccion();
    String getCodigoMotivoTransaccion();
    String getNombreMotivoTransaccion();
    BigDecimal getMontoTransaccion();
}