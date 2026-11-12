import React from "react";
import Icono from "./Icono.jsx";

// Mensaje de estado reutilizable: error de petición, confirmación, informativo.
const ICONOS = { error: "alerta", exito: "check", info: "info" };

export default function Aviso({ tipo = "info", children }) {
  if (!children) return null;
  return (
    <div className={"aviso aviso--" + tipo} role={tipo === "error" ? "alert" : "status"}>
      <Icono nombre={ICONOS[tipo]} tamano={15} className="aviso__icono" />
      <span>{children}</span>
    </div>
  );
}
