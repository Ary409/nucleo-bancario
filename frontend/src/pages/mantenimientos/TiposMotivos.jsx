import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import Aviso from "../../components/Aviso.jsx";
import BarraTitulo from "../../components/BarraTitulo.jsx";

const TIPO_VACIO = { codigoTipoTransaccion: "", nombreTipoTransaccion: "" };
const MOTIVO_VACIO = { codigoMotivoTransaccion: "", nombreMotivoTransaccion: "", idTipoTransaccion: "" };

export default function TiposMotivos() {
  const [tipos, setTipos] = useState([]);
  const [motivos, setMotivos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // Estado del formulario de TIPOS
  const [formTipo, setFormTipo] = useState(TIPO_VACIO);
  const [editTipoId, setEditTipoId] = useState(null);
  const [mostrarFormTipo, setMostrarFormTipo] = useState(false);

  // Estado del formulario de MOTIVOS
  const [formMotivo, setFormMotivo] = useState(MOTIVO_VACIO);
  const [editMotivoId, setEditMotivoId] = useState(null);
  const [mostrarFormMotivo, setMostrarFormMotivo] = useState(false);

  const [enviando, setEnviando] = useState(false);

  async function cargar() {
    setCargando(true);
    setError("");
    try {
      const [listaTipos, listaMotivos] = await Promise.all([
        api.tiposTransaccion(),
        api.motivos()
      ]);
      setTipos(Array.isArray(listaTipos) ? listaTipos : []);
      setMotivos(Array.isArray(listaMotivos) ? listaMotivos : []);
    } catch (e) {
      setError("No se pudieron cargar los datos: " + e.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  function nombreTipo(idTipoTransaccion) {
    const t = tipos.find((x) => x.idTipoTransaccion === idTipoTransaccion);
    return t ? t.nombreTipoTransaccion : idTipoTransaccion;
  }

  // ===== TIPOS =====
  async function guardarTipo(evento) {
    evento.preventDefault();
    setError(""); setExito("");
    if (!formTipo.codigoTipoTransaccion || !formTipo.nombreTipoTransaccion) {
      setError("Código y nombre del tipo son obligatorios");
      return;
    }
    setEnviando(true);
    try {
      if (editTipoId === null) {
        await api.crearTipoTransaccion(formTipo);
        setExito("Tipo creado correctamente");
      } else {
        await api.actualizarTipoTransaccion(editTipoId, formTipo);
        setExito("Tipo actualizado correctamente");
      }
      setFormTipo(TIPO_VACIO); setEditTipoId(null); setMostrarFormTipo(false);
      await cargar();
    } catch (e) { setError(e.message); }
    finally { setEnviando(false); }
  }

  function editarTipo(t) {
    setFormTipo({ codigoTipoTransaccion: t.codigoTipoTransaccion, nombreTipoTransaccion: t.nombreTipoTransaccion });
    setEditTipoId(t.idTipoTransaccion);
    setMostrarFormTipo(true);
  }

  async function eliminarTipo(t) {
    if (!window.confirm("¿Eliminar el tipo " + t.nombreTipoTransaccion + "?")) return;
    try { await api.eliminarTipoTransaccion(t.idTipoTransaccion); setExito("Tipo eliminado"); await cargar(); }
    catch (e) { setError(e.message); }
  }

  // ===== MOTIVOS =====
  async function guardarMotivo(evento) {
    evento.preventDefault();
    setError(""); setExito("");
    if (!formMotivo.codigoMotivoTransaccion || !formMotivo.nombreMotivoTransaccion || !formMotivo.idTipoTransaccion) {
      setError("Código, nombre y tipo del motivo son obligatorios");
      return;
    }
    const datos = { ...formMotivo, idTipoTransaccion: Number(formMotivo.idTipoTransaccion) };
    setEnviando(true);
    try {
      if (editMotivoId === null) {
        await api.crearMotivo(datos);
        setExito("Motivo creado correctamente");
      } else {
        await api.actualizarMotivo(editMotivoId, datos);
        setExito("Motivo actualizado correctamente");
      }
      setFormMotivo(MOTIVO_VACIO); setEditMotivoId(null); setMostrarFormMotivo(false);
      await cargar();
    } catch (e) { setError(e.message); }
    finally { setEnviando(false); }
  }

  function editarMotivo(m) {
    setFormMotivo({
      codigoMotivoTransaccion: m.codigoMotivoTransaccion,
      nombreMotivoTransaccion: m.nombreMotivoTransaccion,
      idTipoTransaccion: m.idTipoTransaccion || ""
    });
    setEditMotivoId(m.idMotivoTransaccion);
    setMostrarFormMotivo(true);
  }

  async function eliminarMotivo(m) {
    if (!window.confirm("¿Eliminar el motivo " + m.nombreMotivoTransaccion + "?")) return;
    try { await api.eliminarMotivo(m.idMotivoTransaccion); setExito("Motivo eliminado"); await cargar(); }
    catch (e) { setError(e.message); }
  }

  return (
    <>
      <BarraTitulo
        titulo="Tipos y motivos"
        descripcion="Catálogo de tipos de transacción y sus motivos"
        meta={cargando ? "Cargando…" : tipos.length + " tipos · " + motivos.length + " motivos"}
      />

      <div className="vista">
        <Aviso tipo="error">{error}</Aviso>
        <Aviso tipo="exito">{exito}</Aviso>

        {/* ===== SECCIÓN TIPOS ===== */}
        <div className="card">
          <div className="card__cabecera">
            <div>
              <div className="card__titulo">Tipos de transacción</div>
              <div className="card__sub">Nota de Débito, Crédito, Transferencias, etc.</div>
            </div>
            {!mostrarFormTipo ? (
              <button type="button" className="btn btn--primario"
                onClick={() => { setFormTipo(TIPO_VACIO); setEditTipoId(null); setMostrarFormTipo(true); }}>
                Agregar tipo
              </button>
            ) : null}
          </div>

          {mostrarFormTipo ? (
            <form className="card__cuerpo" onSubmit={guardarTipo}>
              <div className="rejilla-form">
                <label className="campo">
                  <span className="campo__etiqueta">Código<span className="requerido">*</span></span>
                  <input className="control" value={formTipo.codigoTipoTransaccion}
                    onChange={(e) => setFormTipo({ ...formTipo, codigoTipoTransaccion: e.target.value })} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Nombre<span className="requerido">*</span></span>
                  <input className="control" value={formTipo.nombreTipoTransaccion}
                    onChange={(e) => setFormTipo({ ...formTipo, nombreTipoTransaccion: e.target.value })} disabled={enviando} />
                </label>
              </div>
              <div className="acciones-form">
                <button type="submit" className="btn btn--primario" disabled={enviando}>
                  {editTipoId === null ? "Crear" : "Guardar cambios"}
                </button>
                <button type="button" className="btn btn--secundario"
                  onClick={() => { setMostrarFormTipo(false); setFormTipo(TIPO_VACIO); setEditTipoId(null); }}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : null}

          <div className="tabla-envoltura">
            <table className="tabla">
              <thead>
                <tr><th>Código</th><th>Nombre</th><th style={{ textAlign: "right" }}>Acciones</th></tr>
              </thead>
              <tbody>
                {tipos.map((t) => (
                  <tr key={t.idTipoTransaccion}>
                    <td className="cod">{t.codigoTipoTransaccion}</td>
                    <td>{t.nombreTipoTransaccion}</td>
                    <td style={{ textAlign: "right" }}>
                      <button type="button" className="btn btn--secundario" onClick={() => editarTipo(t)}>Editar</button>{" "}
                      <button type="button" className="btn btn--secundario" onClick={() => eliminarTipo(t)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== SECCIÓN MOTIVOS ===== */}
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card__cabecera">
            <div>
              <div className="card__titulo">Motivos de transacción</div>
              <div className="card__sub">Cada motivo pertenece a un tipo</div>
            </div>
            {!mostrarFormMotivo ? (
              <button type="button" className="btn btn--primario"
                onClick={() => { setFormMotivo(MOTIVO_VACIO); setEditMotivoId(null); setMostrarFormMotivo(true); }}>
                Agregar motivo
              </button>
            ) : null}
          </div>

          {mostrarFormMotivo ? (
            <form className="card__cuerpo" onSubmit={guardarMotivo}>
              <div className="rejilla-form">
                <label className="campo">
                  <span className="campo__etiqueta">Código<span className="requerido">*</span></span>
                  <input className="control" value={formMotivo.codigoMotivoTransaccion}
                    onChange={(e) => setFormMotivo({ ...formMotivo, codigoMotivoTransaccion: e.target.value })} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Nombre<span className="requerido">*</span></span>
                  <input className="control" value={formMotivo.nombreMotivoTransaccion}
                    onChange={(e) => setFormMotivo({ ...formMotivo, nombreMotivoTransaccion: e.target.value })} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Tipo<span className="requerido">*</span></span>
                  <select className="control" value={formMotivo.idTipoTransaccion}
                    onChange={(e) => setFormMotivo({ ...formMotivo, idTipoTransaccion: e.target.value })} disabled={enviando}>
                    <option value="">Seleccione…</option>
                    {tipos.map((t) => (
                      <option key={t.idTipoTransaccion} value={t.idTipoTransaccion}>{t.nombreTipoTransaccion}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="acciones-form">
                <button type="submit" className="btn btn--primario" disabled={enviando}>
                  {editMotivoId === null ? "Crear" : "Guardar cambios"}
                </button>
                <button type="button" className="btn btn--secundario"
                  onClick={() => { setMostrarFormMotivo(false); setFormMotivo(MOTIVO_VACIO); setEditMotivoId(null); }}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : null}

          <div className="tabla-envoltura">
            <table className="tabla">
              <thead>
                <tr><th>Código</th><th>Nombre</th><th>Tipo</th><th style={{ textAlign: "right" }}>Acciones</th></tr>
              </thead>
              <tbody>
                {motivos.map((m) => (
                  <tr key={m.idMotivoTransaccion}>
                    <td className="cod">{m.codigoMotivoTransaccion}</td>
                    <td>{m.nombreMotivoTransaccion}</td>
                    <td>{nombreTipo(m.idTipoTransaccion)}</td>
                    <td style={{ textAlign: "right" }}>
                      <button type="button" className="btn btn--secundario" onClick={() => editarMotivo(m)}>Editar</button>{" "}
                      <button type="button" className="btn btn--secundario" onClick={() => eliminarMotivo(m)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}