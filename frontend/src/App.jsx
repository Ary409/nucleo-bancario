import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import NuevaTransaccion from "./pages/NuevaTransaccion.jsx";
import ReporteDiario from "./pages/ReporteDiario.jsx";
import Clientes from "./pages/mantenimientos/Clientes.jsx";
import Agencias from "./pages/mantenimientos/Agencias.jsx";
import CanalesServicio from "./pages/mantenimientos/CanalesServicio.jsx";
import TiposMotivos from "./pages/mantenimientos/TiposMotivos.jsx";
import Usuarios from "./pages/mantenimientos/Usuarios.jsx";

// Raíz de la aplicación: sin sesión sólo existe el login.
export default function App() {
  const { autenticado } = useAuth();

  if (!autenticado) return <Login />;

  return (
    <Layout>
      <Routes>
        <Route path="/transacciones/nueva" element={<NuevaTransaccion />} />
        <Route path="/reportes/diario" element={<ReporteDiario />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/agencias" element={<Agencias />} />
        <Route path="/canales" element={<CanalesServicio />} />
        <Route path="/tipos-motivos" element={<TiposMotivos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="*" element={<Navigate to="/transacciones/nueva" replace />} />
      </Routes>
    </Layout>
  );
}
