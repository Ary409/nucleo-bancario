package com.banco.transacciones.repository;

import com.banco.transacciones.dto.ReporteTransaccion;
import com.banco.transacciones.entity.Transaccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;
public interface TransaccionRepository extends JpaRepository<Transaccion, Integer> {

    @Query(value = """
    SELECT
        t.fecha_transaccion          AS "fechaTransaccion",
        tc.nombre_tipo_cliente       AS "tipoCliente",
        c.numero_identidad           AS "identidadCliente",
        c.nombre_cliente             AS "nombreCliente",
        a.codigo_agencia             AS "codigoAgencia",
        a.nombre_agencia             AS "nombreAgencia",
        cs.nombre_canal_servicio     AS "canalServicio",
        tt.codigo_tipo_transaccion   AS "codigoTransaccion",
        tt.nombre_tipo_transaccion   AS "nombreTransaccion",
        mt.codigo_motivo_transaccion AS "codigoMotivoTransaccion",
        mt.nombre_motivo_transaccion AS "nombreMotivoTransaccion",
        t.monto_transaccion          AS "montoTransaccion"
    FROM transaccional.transacciones t
    JOIN general.clientes c               ON c.id_cliente = t.id_cliente
    JOIN parametros.tipo_cliente tc       ON tc.id_tipo_cliente = c.id_tipo_cliente
    JOIN general.agencias a               ON a.id_agencia = t.id_agencia
    JOIN parametros.canal_servicio cs     ON cs.id_canal_servicio = a.id_canal_servicio
    JOIN parametros.motivo_transaccion mt ON mt.id_motivo_transaccion = t.id_motivo_transaccion
    JOIN parametros.tipo_transaccion tt   ON tt.id_tipo_transaccion = mt.id_tipo_transaccion
    WHERE CAST(t.fecha_transaccion AS DATE) = :fecha
    ORDER BY t.fecha_transaccion
    """, nativeQuery = true)
    List<ReporteTransaccion> obtenerReportePorFecha(@Param("fecha") LocalDate fecha);

}
