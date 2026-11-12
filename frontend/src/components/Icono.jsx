import React from "react";

// Iconos Lucide (stroke 1.5) embebidos como paths para no depender de un CDN.
const TRAZOS = {
  "arrow-left-right": "M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4",
  "bar-chart": "M3 3v18h18M7 16v-5M12 16V8M17 16v-9",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  building: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM10 6h4M10 10h4M10 14h4M10 18h4M2 22h20",
  radio: "M4.9 19.1a10 10 0 0 1 0-14.2M7.8 16.2a6 6 0 0 1 0-8.4M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M16.2 7.8a6 6 0 0 1 0 8.4M19.1 4.9a10 10 0 0 1 0 14.2",
  tags: "M3 7V4a1 1 0 0 1 1-1h3l10 10-4 4L3 7ZM7.5 7.5h.01M14 3h3a1 1 0 0 1 1 1v3",
  "shield-user": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10ZM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4M8.5 16a3.5 3.5 0 0 1 7 0",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  alerta: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  check: "M20 6 9 17l-5-5",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M12 16v-4M12 8h.01",
  candado: "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2ZM7 11V7a5 5 0 0 1 10 0v4",
  construccion: "M2 20h20M4 20V8h16v12M9 12h6M12 4v4"
};

export default function Icono({ nombre, tamano = 16, ...resto }) {
  const trazo = TRAZOS[nombre];
  if (!trazo) return null;
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...resto}
    >
      <path d={trazo} />
    </svg>
  );
}
