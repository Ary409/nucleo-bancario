import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import Icono from "./Icono.jsx";
import Marca from "./Marca.jsx";

// Menú agrupado por secciones. El orden refleja la frecuencia de uso diario.
const GRUPOS = [
  {
    titulo: "OPERACIÓN",
    items: [
      { ruta: "/transacciones/nueva", etiqueta: "Nueva transacción", icono: "arrow-left-right" },
      { ruta: "/reportes/diario", etiqueta: "Reporte diario", icono: "bar-chart" }
    ]
  },
  {
    titulo: "MANTENIMIENTOS",
    items: [
      { ruta: "/clientes", etiqueta: "Clientes", icono: "users" },
      { ruta: "/agencias", etiqueta: "Agencias", icono: "building" },
      { ruta: "/canales", etiqueta: "Canales de servicio", icono: "radio" },
      { ruta: "/tipos-motivos", etiqueta: "Tipos y motivos", icono: "tags" },
      { ruta: "/usuarios", etiqueta: "Usuarios", icono: "shield-user" }
    ]
  }
];

export default function Sidebar() {
  const { sesion, cerrarSesion } = useAuth();
  const codigo = (sesion && sesion.codigoUsuario) || "";
  const inicial = codigo.slice(0, 1).toUpperCase() || "U";

  return (
    <aside className="sidebar">
      <div className="sidebar__marca">
        <Marca tamano={28} />
        <div>
          <div className="sidebar__marca-nombre">Núcleo Bancario</div>
          <div className="sidebar__marca-sub">Registro transaccional</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {GRUPOS.map((grupo) => (
          <div key={grupo.titulo}>
            <div className="sidebar__grupo">{grupo.titulo}</div>
            {grupo.items.map((item) => (
              <NavLink
                key={item.ruta}
                to={item.ruta}
                className={({ isActive }) =>
                  isActive ? "sidebar__item sidebar__item--activo" : "sidebar__item"
                }
              >
                <Icono nombre={item.icono} tamano={16} />
                <span>{item.etiqueta}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar__pie">
        <div className="sidebar__usuario">
          <div className="sidebar__avatar">{inicial}</div>
          <div style={{ minWidth: 0 }}>
            <div className="sidebar__usuario-nombre">{codigo}</div>
            <div className="sidebar__usuario-rol">Sesión activa</div>
          </div>
        </div>
        <button type="button" className="sidebar__salir" onClick={() => cerrarSesion()}>
          <Icono nombre="logout" tamano={15} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
