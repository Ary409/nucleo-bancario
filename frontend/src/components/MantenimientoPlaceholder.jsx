import React from "react";
import BarraTitulo from "./BarraTitulo.jsx";
import Icono from "./Icono.jsx";

// Estructura base compartida por los mantenimientos (CRUD pendiente).
// Cada pantalla declara sus columnas y el endpoint que consumirá.
export default function MantenimientoPlaceholder({ titulo, descripcion, columnas, endpoint }) {
  return (
    <>
      <BarraTitulo titulo={titulo} descripcion={descripcion} meta="Módulo en construcción" />
      <div className="vista">
        <div className="card">
          <div className="card__cabecera">
            <div>
              <div className="card__titulo">{titulo}</div>
              <div className="card__sub">Endpoint previsto: {endpoint}</div>
            </div>
            <button type="button" className="btn btn--primario" disabled>
              Agregar
            </button>
          </div>

          <div className="tabla-envoltura">
            <table className="tabla">
              <thead>
                <tr>
                  {columnas.map((columna) => (
                    <th key={columna}>{columna}</th>
                  ))}
                  <th style={{ textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="vacio">
            <div style={{ color: "#8A8A8A", marginBottom: 10 }}>
              <Icono nombre="construccion" tamano={22} />
            </div>
            <div className="vacio__titulo">Mantenimiento pendiente de implementar</div>
            <p className="vacio__texto">
              La estructura de la pantalla está lista. Falta conectar el listado y las
              operaciones de alta, edición y baja contra {endpoint}.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
