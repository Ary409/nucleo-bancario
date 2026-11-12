import React, { useEffect, useState } from "react";
import { api } from "../../api/client.js";
import Aviso from "../../components/Aviso.jsx";
import BarraTitulo from "../../components/BarraTitulo.jsx";

const FORM_VACIO = { codigoUsuario: "", nombreUsuario: "", passwordUsuario: "" };

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
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
      const lista = await api.usuarios();
      setUsuarios(Array.isArray(lista) ? lista : []);
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

  function abrirEditar(usuario) {
    setForm({
      codigoUsuario: usuario.codigoUsuario || "",
      nombreUsuario: usuario.nombreUsuario || "",
      passwordUsuario: "" // vacío: solo se cambia si escribe una nueva
    });
    setEditandoId(usuario.idUsuario);
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

    // Al crear, la contraseña es obligatoria; al editar, opcional
    if (!form.codigoUsuario || !form.nombreUsuario) {
      setError("Código y nombre son obligatorios");
      return;
    }
    if (editandoId === null && !form.passwordUsuario) {
      setError("La contraseña es obligatoria al crear un usuario");
      return;
    }

    const datos = {
      codigoUsuario: form.codigoUsuario,
      nombreUsuario: form.nombreUsuario,
      passwordUsuario: form.passwordUsuario
    };

    setEnviando(true);
    try {
      if (editandoId === null) {
        await api.crearUsuario(datos);
        setExito("Usuario creado correctamente");
      } else {
        await api.actualizarUsuario(editandoId, datos);
        setExito("Usuario actualizado correctamente");
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

  async function eliminar(usuario) {
    if (!window.confirm("¿Eliminar al usuario " + usuario.nombreUsuario + "?")) return;
    setError("");
    setExito("");
    try {
      await api.eliminarUsuario(usuario.idUsuario);
      setExito("Usuario eliminado");
      await cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  // Formatea la última conexión de forma legible
  function formatoFecha(valor) {
    if (!valor) return "Nunca";
    const f = new Date(valor);
    if (Number.isNaN(f.getTime())) return "—";
    const dd = String(f.getDate()).padStart(2, "0");
    const mm = String(f.getMonth() + 1).padStart(2, "0");
    const hh = String(f.getHours()).padStart(2, "0");
    const min = String(f.getMinutes()).padStart(2, "0");
    return dd + "/" + mm + " " + hh + ":" + min;
  }

  return (
    <>
      <BarraTitulo
        titulo="Usuarios"
        descripcion="Usuarios con acceso al sistema"
        meta={cargando ? "Cargando…" : usuarios.length + " registros"}
      />

      <div className="vista">
        <Aviso tipo="error">{error}</Aviso>
        <Aviso tipo="exito">{exito}</Aviso>

        <div className="card">
          <div className="card__cabecera">
            <div>
              <div className="card__titulo">Listado de usuarios</div>
              <div className="card__sub">Alta, edición y baja de usuarios de seguridad</div>
            </div>
            {!mostrarForm ? (
              <button type="button" className="btn btn--primario" onClick={abrirCrear}>
                Agregar usuario
              </button>
            ) : null}
          </div>

          {mostrarForm ? (
            <form className="card__cuerpo" onSubmit={guardar}>
              <div className="rejilla-form">
                <label className="campo">
                  <span className="campo__etiqueta">Código de usuario<span className="requerido">*</span></span>
                  <input className="control" value={form.codigoUsuario}
                    onChange={(e) => actualizar("codigoUsuario", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo">
                  <span className="campo__etiqueta">Nombre<span className="requerido">*</span></span>
                  <input className="control" value={form.nombreUsuario}
                    onChange={(e) => actualizar("nombreUsuario", e.target.value)} disabled={enviando} />
                </label>
                <label className="campo rejilla-form--ancho">
                  <span className="campo__etiqueta">
                    Contraseña{editandoId === null ? <span className="requerido">*</span> : " (dejar vacío para no cambiar)"}
                  </span>
                  <input className="control" type="password" value={form.passwordUsuario}
                    onChange={(e) => actualizar("passwordUsuario", e.target.value)} disabled={enviando}
                    placeholder={editandoId === null ? "" : "••••••••"} />
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
                  <th>Estado</th>
                  <th>Última conexión</th>
                  <th style={{ textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.idUsuario}>
                    <td className="cod">{u.codigoUsuario}</td>
                    <td>{u.nombreUsuario}</td>
                    <td>{u.isActivo ? "Activo" : "Inactivo"}</td>
                    <td>{formatoFecha(u.ultimaConexion)}</td>
                    <td style={{ textAlign: "right" }}>
                      <button type="button" className="btn btn--secundario" onClick={() => abrirEditar(u)}>
                        Editar
                      </button>
                      {" "}
                      <button type="button" className="btn btn--secundario" onClick={() => eliminar(u)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!cargando && usuarios.length === 0 ? (
            <div className="vacio"><div className="vacio__titulo">No hay usuarios registrados</div></div>
          ) : null}
        </div>
      </div>
    </>
  );
}