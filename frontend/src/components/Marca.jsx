import React from "react";

// Marca del sistema: cuadrado verde con la "N" y el wordmark.
export default function Marca({ tamano = 30, color = "#0F7A3D" }) {
  return (
    <div
      style={{
        width: tamano,
        height: tamano,
        borderRadius: 4,
        background: color,
        color: "#FFFFFF",
        display: "grid",
        placeItems: "center",
        fontWeight: 700,
        fontSize: Math.round(tamano * 0.46),
        flexShrink: 0
      }}
    >
      N
    </div>
  );
}
