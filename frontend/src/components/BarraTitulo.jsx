import React from "react";

// Encabezado sticky de cada pantalla.
export default function BarraTitulo({ titulo, descripcion, meta }) {
  return (
    <header className="barra">
      <div>
        <h1>{titulo}</h1>
        {descripcion ? <p className="sub">{descripcion}</p> : null}
      </div>
      {meta ? <div className="barra__meta">{meta}</div> : null}
    </header>
  );
}
