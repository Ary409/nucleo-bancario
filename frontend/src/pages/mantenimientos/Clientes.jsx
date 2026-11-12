import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import Aviso from "../../components/Aviso.jsx";
import BarraTitulo from "../../components/BarraTitulo.jsx";

const FORM_VACIO = { codigoCliente: "", numeroIdentidad: "", nombreCliente: "", idTipoCliente: "" };

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [tipos, setTipos] = useState([]);
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
      const [lista, listaTipos] = await Promise.all([api.clientes(), api.tiposCliente()]);
      setClientes(Array.isArray(lista) ? lista : []);
      setTipos(Array.isArray(listaTipos) ? listaTipos : []);
    } catch (e) {
      setError("No se pudieron cargar los datos: " + e.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  
  function nombreTipo(idTipoCliente) {
    const t = tipos.find((x) => x.idTipoCliente === idTipoCliente);
    return t ? t.nombreTipoCliente : idTipoCliente;
  }

  function abrirCrear() {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setMostrarForm(true);
    setError("");
    setExito("");
  }

  function abrirEditar(cliente) {
    setForm({
      codigoCliente: cliente.codigoCliente || "",
      numeroIdentidad: cliente.numeroIdentidad || "",
      nombreCliente: cliente.nombreCliente || "",
      idTipoCliente: cliente.idTipoCliente || ""
    });
    setEditandoId(cliente.idCliente);
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

    if (!form.codigoCliente || !form.numeroIdentidad || !form.nombreCliente || !form.idTipoCliente) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const datos = {
      codigoCliente: form.codigoCliente,
      numeroIdentidad: form.numeroIdentidad,
      nombreCliente: form.nombreCliente,
      idTipoCliente: Number(form.idTipoCliente)
    };

    setEnviando(true);
    try {
      if (editandoId === null) {
        await api.crearCliente(datos);
        setExito("Cliente creado correctamente");
      } else {
        await api.actualizarCliente(editandoId, datos);
        setExito("Cliente actualizado correctamente");
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

  async function eliminar(cliente) {
    if (!window.confirm("¿Eliminar al cliente " + cliente.nombreCliente + "?")) return;
    setError("");
    setExito("");
    try {
      await api.eliminarCliente(cliente.idCliente);
      setExito("Cliente eliminado");
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <BarraTitulo
        titulo="Clientes"
        descripcion="Catálogo de clientes de la institución"
        meta={cargando ? "Cargando…" : clientes.length + " registros"}
      />

      <div className="vista">
        <Aviso tipo="error">{error}</Aviso>
        <Aviso tipo="exito">{exito}</Aviso>

        <div className="card">
          <div className="card__cabecera">
            <div>
              <div className="card__titulo">Listado de clientes</div>
              <div className="card__sub">Alta, edición y baja de clientes</div>
            </div>
            {!mostrarForm ? (
              <button type="button" className="btn btn--primario" onClick={abrirCrear}>
                Agregar cliente
              </button>
            ) : null}
          </div>

          {/* Formulario (crear/editar) */}
          {mostrarForm ? (
            <form className="card__cuerpo" onSubmit={guardar}>
              <div className="rejilla-form">
                <label className="campo">
                  <span className="campo__etiqueta">Código<span className="requerido">*</span></span>
                  <input className="control" value={form.codigoCliente}
                    onChange={(e) => actualizar("codigoCliente", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Identidad<span className="requerido">*</span></span>
                  <input className="control" value={form.numeroIdentidad}
                    onChange={(e) => actualizar("numeroIdentidad", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo rejilla-form--ancho">
                  <span className="campo__etiqueta">Nombre<span className="requerido">*</span></span>
                  <input className="control" value={form.nombreCliente}
                    onChange={(e) => actualizar("nombreCliente", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Tipo de cliente<span className="requerido">*</span></span>
                  <select className="control" value={form.idTipoCliente}
                    onChange={(e) => actualizar("idTipoCliente", e.target.value)} disabled={enviando}>
                    <option value="">Seleccione…</option>
                    {tipos.map((t) => (
                      <option key={t.idTipoCliente} value={t.idTipoCliente}>{t.nombreTipoCliente}</option>
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

          {/* Tabla */}
          <div className="tabla-envoltura">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Identidad</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th style={{ textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.idCliente}>
                    <td className="cod">{c.codigoCliente}</td>
                    <td className="cod">{c.numeroIdentidad}</td>
                    <td>{c.nombreCliente}</td>
                    <td>{nombreTipo(c.idTipoCliente)}</td>
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

          {!cargando && clientes.length === 0 ? (
            <div className="vacio"><div className="vacio__titulo">No hay clientes registrados</div></div>
          ) : null}
        </div>
      </div>
    </>
  );
}