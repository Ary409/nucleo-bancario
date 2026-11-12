import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import Aviso from "../../components/Aviso.jsx";
import BarraTitulo from "../../components/BarraTitulo.jsx";

const FORM_VACIO = {
  codigoAgencia: "",
  nombreAgencia: "",
  direccionAgencia: "",
  telefonoAgencia: "",
  idCanalServicio: ""
};

export default function Agencias() {
  const [agencias, setAgencias] = useState([]);
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
      const [lista, listaCanales] = await Promise.all([api.agencias(), api.canales()]);
      setAgencias(Array.isArray(lista) ? lista : []);
      setCanales(Array.isArray(listaCanales) ? listaCanales : []);
    } catch (e) {
      setError("No se pudieron cargar los datos: " + e.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  function nombreCanal(idCanalServicio) {
    const c = canales.find((x) => x.idCanalServicio === idCanalServicio);
    return c ? c.nombreCanalServicio : idCanalServicio;
  }

  function abrirCrear() {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setMostrarForm(true);
    setError("");
    setExito("");
  }

  function abrirEditar(agencia) {
    setForm({
      codigoAgencia: agencia.codigoAgencia || "",
      nombreAgencia: agencia.nombreAgencia || "",
      direccionAgencia: agencia.direccionAgencia || "",
      telefonoAgencia: agencia.telefonoAgencia || "",
      idCanalServicio: agencia.idCanalServicio || ""
    });
    setEditandoId(agencia.idAgencia);
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

    if (!form.codigoAgencia || !form.nombreAgencia || !form.idCanalServicio) {
      setError("Código, nombre y canal son obligatorios");
      return;
    }

    const datos = {
      codigoAgencia: form.codigoAgencia,
      nombreAgencia: form.nombreAgencia,
      direccionAgencia: form.direccionAgencia,
      telefonoAgencia: form.telefonoAgencia,
      idCanalServicio: Number(form.idCanalServicio)
    };

    setEnviando(true);
    try {
      if (editandoId === null) {
        await api.crearAgencia(datos);
        setExito("Agencia creada correctamente");
      } else {
        await api.actualizarAgencia(editandoId, datos);
        setExito("Agencia actualizada correctamente");
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

  async function eliminar(agencia) {
    if (!window.confirm("¿Eliminar la agencia " + agencia.nombreAgencia + "?")) return;
    setError("");
    setExito("");
    try {
      await api.eliminarAgencia(agencia.idAgencia);
      setExito("Agencia eliminada");
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <BarraTitulo
        titulo="Agencias"
        descripcion="Catálogo de agencias de la institución"
        meta={cargando ? "Cargando…" : agencias.length + " registros"}
      />

      <div className="vista">
        <Aviso tipo="error">{error}</Aviso>
        <Aviso tipo="exito">{exito}</Aviso>

        <div className="card">
          <div className="card__cabecera">
            <div>
              <div className="card__titulo">Listado de agencias</div>
              <div className="card__sub">Alta, edición y baja de agencias</div>
            </div>
            {!mostrarForm ? (
              <button type="button" className="btn btn--primario" onClick={abrirCrear}>
                Agregar agencia
              </button>
            ) : null}
          </div>

          {mostrarForm ? (
            <form className="card__cuerpo" onSubmit={guardar}>
              <div className="rejilla-form">
                <label className="campo">
                  <span className="campo__etiqueta">Código<span className="requerido">*</span></span>
                  <input className="control" value={form.codigoAgencia}
                    onChange={(e) => actualizar("codigoAgencia", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Nombre<span className="requerido">*</span></span>
                  <input className="control" value={form.nombreAgencia}
                    onChange={(e) => actualizar("nombreAgencia", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Dirección</span>
                  <input className="control" value={form.direccionAgencia}
                    onChange={(e) => actualizar("direccionAgencia", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Teléfono</span>
                  <input className="control" value={form.telefonoAgencia}
                    onChange={(e) => actualizar("telefonoAgencia", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Canal de servicio<span className="requerido">*</span></span>
                  <select className="control" value={form.idCanalServicio}
                    onChange={(e) => actualizar("idCanalServicio", e.target.value)} disabled={enviando}>
                    <option value="">Seleccione…</option>
                    {canales.map((c) => (
                      <option key={c.idCanalServicio} value={c.idCanalServicio}>{c.nombreCanalServicio}</option>
                    ))}
                  </select>
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
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Canal</th>
                  <th style={{ textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {agencias.map((a) => (
                  <tr key={a.idAgencia}>
                    <td className="cod">{a.codigoAgencia}</td>
                    <td>{a.nombreAgencia}</td>
                    <td>{a.direccionAgencia}</td>
                    <td>{a.telefonoAgencia}</td>
                    <td>{nombreCanal(a.idCanalServicio)}</td>
                    <td style={{ textAlign: "right" }}>
                      <button type="button" className="btn btn--secundario" onClick={() => abrirEditar(a)}>
                        Editar
                      </button>
                      {" "}
                      <button type="button" className="btn btn--secundario" onClick={() => eliminar(a)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!cargando && agencias.length === 0 ? (
            <div className="vacio"><div className="vacio__titulo">No hay agencias registradas</div></div>
          ) : null}
        </div>
      </div>
    </>
  );
}