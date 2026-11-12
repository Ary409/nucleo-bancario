import React, { useEffect, useState } from "react";
import { api } from "../api/client.js";
import Aviso from "../components/Aviso.jsx";
import BarraTitulo from "../components/BarraTitulo.jsx";
import { formatearLempiras } from "../utils/formato.js";

const FORM_VACIO = { idCliente: "", idAgencia: "", idMotivoTransaccion: "", montoTransaccion: "" };

// Registro de una transacción. Los tres selects se llenan con catálogos de la API.
export default function NuevaTransaccion() {
  const [catalogos, setCatalogos] = useState({ clientes: [], agencias: [], motivos: [] });
  const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
  const [errorCatalogos, setErrorCatalogos] = useState("");

  const [form, setForm] = useState(FORM_VACIO);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // Carga de los tres catálogos en paralelo al montar la pantalla.
  useEffect(() => {
    let vigente = true;
    async function cargar() {
      setCargandoCatalogos(true);
      setErrorCatalogos("");
      try {
        const [clientes, agencias, motivos] = await Promise.all([
          api.clientes(),
          api.agencias(),
          api.motivos()
        ]);
        if (!vigente) return;
        setCatalogos({
          clientes: Array.isArray(clientes) ? clientes : [],
          agencias: Array.isArray(agencias) ? agencias : [],
          motivos: Array.isArray(motivos) ? motivos : []
        });
      } catch (e) {
        if (vigente) setErrorCatalogos("No se pudieron cargar los catálogos: " + e.message);
      } finally {
        if (vigente) setCargandoCatalogos(false);
      }
    }
    cargar();
    return () => {
      vigente = false;
    };
  }, []);

  function actualizar(campo, valor) {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
    setExito("");
    setError("");
  }

  async function alEnviar(evento) {
    evento.preventDefault();
    setError("");
    setExito("");

    const monto = Number(form.montoTransaccion);
    if (!form.idCliente || !form.idAgencia || !form.idMotivoTransaccion) {
      setError("Seleccione cliente, agencia y motivo");
      return;
    }
    if (!Number.isFinite(monto) || monto <= 0) {
      setError("El monto debe ser mayor a cero");
      return;
    }

    setEnviando(true);
    try {
      // El backend espera números, no cadenas.
      await api.crearTransaccion({
        idCliente: Number(form.idCliente),
        idAgencia: Number(form.idAgencia),
        idMotivoTransaccion: Number(form.idMotivoTransaccion),
        montoTransaccion: monto
      });
      setExito("Transacción registrada por " + formatearLempiras(monto));
      setForm(FORM_VACIO); // limpiar el formulario tras un 201
    } catch (e) {
      setError(e.message);
    } finally {
      setEnviando(false);
    }
  }

  const bloqueado = enviando || cargandoCatalogos;

  return (
    <>
      <BarraTitulo
        titulo="Nueva transacción"
        descripcion="Registro de un movimiento de cliente"
        meta={cargandoCatalogos ? "Cargando catálogos…" : "Catálogos actualizados"}
      />

      <div className="vista" style={{ maxWidth: 860 }}>
        <Aviso tipo="error">{errorCatalogos}</Aviso>
        <Aviso tipo="exito">{exito}</Aviso>
        <Aviso tipo="error">{error}</Aviso>

        <form className="card" onSubmit={alEnviar} noValidate>
          <div className="card__cabecera">
            <div>
              <div className="card__titulo">Datos de la transacción</div>
              <div className="card__sub">Los campos marcados son obligatorios</div>
            </div>
          </div>

          <div className="card__cuerpo">
            <div className="rejilla-form">
              <label className="campo rejilla-form--ancho">
                <span className="campo__etiqueta">
                  Cliente<span className="requerido">*</span>
                </span>
                <select
                  className="control"
                  value={form.idCliente}
                  onChange={(e) => actualizar("idCliente", e.target.value)}
                  disabled={bloqueado}
                >
                  <option value="">Seleccione un cliente</option>
                  {catalogos.clientes.map((c) => (
                    <option key={c.idCliente} value={c.idCliente}>
                      {c.nombreCliente}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo">
                <span className="campo__etiqueta">
                  Agencia<span className="requerido">*</span>
                </span>
                <select
                  className="control"
                  value={form.idAgencia}
                  onChange={(e) => actualizar("idAgencia", e.target.value)}
                  disabled={bloqueado}
                >
                  <option value="">Seleccione una agencia</option>
                  {catalogos.agencias.map((a) => (
                    <option key={a.idAgencia} value={a.idAgencia}>
                      {a.nombreAgencia}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo">
                <span className="campo__etiqueta">
                  Motivo de transacción<span className="requerido">*</span>
                </span>
                <select
                  className="control"
                  value={form.idMotivoTransaccion}
                  onChange={(e) => actualizar("idMotivoTransaccion", e.target.value)}
                  disabled={bloqueado}
                >
                  <option value="">Seleccione un motivo</option>
                  {catalogos.motivos.map((m) => (
                    <option key={m.idMotivoTransaccion} value={m.idMotivoTransaccion}>
                      {m.nombreMotivoTransaccion}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo">
                <span className="campo__etiqueta">
                  Monto<span className="requerido">*</span>
                </span>
                <input
                  className="control control--monto"
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={form.montoTransaccion}
                  onChange={(e) => actualizar("montoTransaccion", e.target.value)}
                  disabled={bloqueado}
                />
                <span className="campo__ayuda">
                  {form.montoTransaccion ? formatearLempiras(form.montoTransaccion) : "Lempiras"}
                </span>
              </label>
            </div>

            <div className="acciones-form">
              <button type="submit" className="btn btn--primario" disabled={bloqueado}>
                {enviando ? "Registrando…" : "Registrar transacción"}
              </button>
              <button
                type="button"
                className="btn btn--secundario"
                onClick={() => {
                  setForm(FORM_VACIO);
                  setError("");
                  setExito("");
                }}
                disabled={enviando}
              >
                Limpiar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
