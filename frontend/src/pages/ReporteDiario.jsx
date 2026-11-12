import React, { useState } from "react";
import { api } from "../api/client.js";
import Aviso from "../components/Aviso.jsx";
import BarraTitulo from "../components/BarraTitulo.jsx";
import { fechaDeHoy, formatearFechaHora, formatearLempiras } from "../utils/formato.js";

// Las 12 columnas del reporte, en orden, con la llave del JSON que las alimenta.
const COLUMNAS = [
  { titulo: "Fecha", campo: "fechaTransaccion", clase: "cod", formato: formatearFechaHora },
  { titulo: "Tipo Cliente", campo: "tipoCliente" },
  { titulo: "Identidad", campo: "identidadCliente", clase: "cod" },
  { titulo: "Nombre Cliente", campo: "nombreCliente" },
  { titulo: "Cód. Agencia", campo: "codigoAgencia", clase: "cod" },
  { titulo: "Agencia", campo: "nombreAgencia" },
  { titulo: "Canal", campo: "canalServicio" },
  { titulo: "Cód. Transacción", campo: "codigoTransaccion", clase: "cod" },
  { titulo: "Transacción", campo: "nombreTransaccion" },
  { titulo: "Cód. Motivo", campo: "codigoMotivoTransaccion", clase: "cod" },
  { titulo: "Motivo", campo: "nombreMotivoTransaccion" },
  { titulo: "Monto", campo: "montoTransaccion", clase: "num", formato: formatearLempiras }
];

export default function ReporteDiario() {
  const [fecha, setFecha] = useState(fechaDeHoy());
  const [filas, setFilas] = useState(null); // null = aún no se ha generado
  const [fechaConsultada, setFechaConsultada] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function generar(evento) {
    if (evento) evento.preventDefault();
    if (!fecha) {
      setError("Seleccione una fecha");
      return;
    }
    setCargando(true);
    setError("");
    try {
      const datos = await api.reporteDiario(fecha);
      setFilas(Array.isArray(datos) ? datos : []);
      setFechaConsultada(fecha);
    } catch (e) {
      setError(e.message);
      setFilas(null);
    } finally {
      setCargando(false);
    }
  }

  const total = (filas || []).reduce((acumulado, fila) => acumulado + Number(fila.montoTransaccion || 0), 0);

  return (
    <>
      <BarraTitulo
        titulo="Reporte diario"
        descripcion="Transacciones registradas en una fecha"
        meta={fechaConsultada ? "Última consulta · " + fechaConsultada : "Sin consultas en esta sesión"}
      />

      <div className="vista">
        <Aviso tipo="error">{error}</Aviso>

        <form className="card" onSubmit={generar} style={{ marginBottom: 16 }}>
          <div className="filtros">
            <label className="campo" style={{ width: 200 }}>
              <span className="campo__etiqueta">Fecha</span>
              <input
                className="control"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                disabled={cargando}
              />
            </label>
            <div className="filtros__acciones">
              <button type="submit" className="btn btn--primario" disabled={cargando}>
                {cargando ? "Generando…" : "Generar"}
              </button>
            </div>
          </div>
        </form>

        <div className="card">
          {filas && filas.length > 0 ? (
            <div className="resumen">
              <div>
                <div className="resumen__titulo">Transacciones del {fechaConsultada}</div>
                <div className="resumen__sub">Todos los canales de servicio</div>
              </div>
              <div className="resumen__cifras">
                <div>
                  <div className="resumen__dato-etq">REGISTROS</div>
                  <div className="resumen__dato-val">{filas.length}</div>
                </div>
                <div>
                  <div className="resumen__dato-etq">MONTO TOTAL</div>
                  <div className="resumen__dato-val">{formatearLempiras(total)}</div>
                </div>
              </div>
            </div>
          ) : null}

          {cargando ? <div className="cargando">Consultando el servidor…</div> : null}

          {!cargando && filas === null ? (
            <div className="vacio">
              <div className="vacio__titulo">Sin reporte generado</div>
              <p className="vacio__texto">
                Seleccione una fecha y presione Generar para consultar las transacciones del día.
              </p>
            </div>
          ) : null}

          {!cargando && filas !== null && filas.length === 0 ? (
            <div className="vacio">
              <div className="vacio__titulo">No hay transacciones en la fecha seleccionada</div>
              <p className="vacio__texto">
                No se registraron movimientos el {fechaConsultada}. Pruebe con otra fecha.
              </p>
            </div>
          ) : null}

          {!cargando && filas !== null && filas.length > 0 ? (
            <div className="tabla-envoltura">
              <table className="tabla">
                <thead>
                  <tr>
                    {COLUMNAS.map((columna) => (
                      <th key={columna.campo} className={columna.clase === "num" ? "num" : undefined}
                        style={columna.clase === "num" ? { textAlign: "right" } : undefined}>
                        {columna.titulo}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filas.map((fila, indice) => (
                    <tr key={indice}>
                      {COLUMNAS.map((columna) => {
                        const valor = fila[columna.campo];
                        const texto = columna.formato ? columna.formato(valor) : valor;
                        return (
                          <td key={columna.campo} className={columna.clase}>
                            {texto === null || texto === undefined || texto === "" ? "—" : texto}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={COLUMNAS.length - 1}>Total del día</td>
                    <td className="num">{formatearLempiras(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
