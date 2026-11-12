import React from "react";
import Sidebar from "./Sidebar.jsx";

// Estructura fija: sidebar oscuro + área de contenido desplazable.
export default function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="contenido">{children}</main>
    </div>
  );
}
