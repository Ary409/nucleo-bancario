import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import Aviso from "../../components/Aviso.jsx";
import BarraTitulo from "../../components/BarraTitulo.jsx";

const FORM_VACIO = { codigoCanalServicio: "", nombreCanalServicio: "" };

export default function CanalesServicio() {
  const [canales, setCanales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function cargar() {
    setCargando(true);
    setError("");
    try {
      const lista = await api.canales();
      setCanales(Array.isArray(lista) ? lista : []);
    } catch (e) {
      setError("No se pudieron cargar los datos: " + e.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  function abrirCrear() {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setMostrarForm(true);
    setError("");
    setExito("");
  }

  function abrirEditar(canal) {
    setForm({
      codigoCanalServicio: canal.codigoCanalServicio || "",
      nombreCanalServicio: canal.nombreCanalServicio || ""
    });
    setEditandoId(canal.idCanalServicio);
    setMostrarForm(true);
    setError("");
    setExito("");
  }

  function actualizar(campo, valor) {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
  }

  async function guardar(evento) {
    evento.preventDefault();
    setError("");
    setExito("");

    if (!form.codigoCanalServicio || !form.nombreCanalServicio) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const datos = {
      codigoCanalServicio: form.codigoCanalServicio,
      nombreCanalServicio: form.nombreCanalServicio
    };

    setEnviando(true);
    try {
      if (editandoId === null) {
        await api.crearCanal(datos);
        setExito("Canal creado correctamente");
      } else {
        await api.actualizarCanal(editandoId, datos);
        setExito("Canal actualizado correctamente");
      }
      setMostrarForm(false);
      setForm(FORM_VACIO);
      setEditandoId(null);
      await cargar();
    } catch (e) {
      setError(e.message);
    } finally {
      setEnviando(false);
    }
  }

  async function eliminar(canal) {
    if (!window.confirm("¿Eliminar el canal " + canal.nombreCanalServicio + "?")) return;
    setError("");
    setExito("");
    try {
      await api.eliminarCanal(canal.idCanalServicio);
      setExito("Canal eliminado");
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <BarraTitulo
        titulo="Canales de servicio"
        descripcion="Catálogo de canales de atención"
        meta={cargando ? "Cargando…" : canales.length + " registros"}
      />

      <div className="vista">
        <Aviso tipo="error">{error}</Aviso>
        <Aviso tipo="exito">{exito}</Aviso>

        <div className="card">
          <div className="card__cabecera">
            <div>
              <div className="card__titulo">Listado de canales</div>
              <div className="card__sub">Alta, edición y baja de canales de servicio</div>
            </div>
            {!mostrarForm ? (
              <button type="button" className="btn btn--primario" onClick={abrirCrear}>
                Agregar canal
              </button>
            ) : null}
          </div>

          {mostrarForm ? (
            <form className="card__cuerpo" onSubmit={guardar}>
              <div className="rejilla-form">
                <label className="campo">
                  <span className="campo__etiqueta">Código<span className="requerido">*</span></span>
                  <input className="control" value={form.codigoCanalServicio}
                    onChange={(e) => actualizar("codigoCanalServicio", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Nombre<span className="requerido">*</span></span>
                  <input className="control" value={form.nombreCanalServicio}
                    onChange={(e) => actualizar("nombreCanalServicio", e.target.value)} disabled={enviando} />
                </label>
              </div>
              <div className="acciones-form">
                <button type="submit" className="btn btn--primario" disabled={enviando}>
                  {enviando ? "Guardando…" : editandoId === null ? "Crear" : "Guardar cambios"}
                </button>
                <button type="button" className="btn btn--secundario"
                  onClick={() => { setMostrarForm(false); setForm(FORM_VACIO); setEditandoId(null); }}
                  disabled={enviando}>
                  Cancelar
                </button>
              </div>
            </form>
          ) : null}

          <div className="tabla-envoltura">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th style={{ textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {canales.map((c) => (
                  <tr key={c.idCanalServicio}>
                    <td className="cod">{c.codigoCanalServicio}</td>
                    <td>{c.nombreCanalServicio}</td>
                    <td style={{ textAlign: "right" }}>
                      <button type="button" className="btn btn--secundario" onClick={() => abrirEditar(c)}>
                        Editar
                      </button>
                      {" "}
                      <button type="button" className="btn btn--secundario" onClick={() => eliminar(c)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!cargando && canales.length === 0 ? (
            <div className="vacio"><div className="vacio__titulo">No hay canales registrados</div></div>
          ) : null}
        </div>
      </div>
    </>
  );
}