import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import Aviso from "../components/Aviso.jsx";
import Icono from "../components/Icono.jsx";
import Marca from "../components/Marca.jsx";

// Pantalla de acceso. Único endpoint que no lleva Authorization.
export default function Login() {
  const { iniciarSesion, mensajeSesion } = useAuth();
  const [codigoUsuario, setCodigoUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function alEnviar(evento) {
    evento.preventDefault();
    setError("");
    if (!codigoUsuario.trim() || !password) {
      setError("Ingrese usuario y contraseña");
      return;
    }
    setEnviando(true);
    try {
      await iniciarSesion(codigoUsuario.trim(), password);
    } catch (e) {
      // 401 del backend o falla de red
      setError(e.status === 401 ? "Usuario o contraseña incorrectos" : e.message);
      setPassword("");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="login">
      <section className="login__marca">
        <div className="login__logo">
          <Marca tamano={30} />
          <div>
            <div style={{ color: "#FFFFFF", fontWeight: 600, letterSpacing: "-0.022em" }}>
              Núcleo Bancario
            </div>
            <div style={{ fontSize: 11, color: "#8FC7A5" }}>Plataforma transaccional interna</div>
          </div>
        </div>

        <div>
          <div className="etiqueta-acento" style={{ marginBottom: 18 }}>USO AUTORIZADO</div>
          <h1>Cada transacción, en un solo sistema.</h1>
          <p>
            Registro de movimientos por caja, ventanilla, banca en internet, banca móvil,
            agentes bancarios y autobancos, con reporte diario consolidado.
          </p>
        </div>

        <div className="login__aviso">
          El acceso a esta plataforma queda registrado. El uso indebido de credenciales
          es responsabilidad del titular de la cuenta.
        </div>
      </section>

      <section className="login__panel">
        <h2>Iniciar sesión</h2>
        <p className="sub">Utilice el código de usuario asignado por la institución.</p>

        <Aviso tipo="error">{error}</Aviso>
        {!error && mensajeSesion ? <Aviso tipo="info">{mensajeSesion}</Aviso> : null}

        <form onSubmit={alEnviar} noValidate>
          <label className="campo">
            <span className="campo__etiqueta">Código de usuario</span>
            <input
              className="control"
              type="text"
              autoComplete="username"
              autoFocus
              value={codigoUsuario}
              onChange={(e) => setCodigoUsuario(e.target.value)}
              disabled={enviando}
            />
          </label>

          <label className="campo">
            <span className="campo__etiqueta">Contraseña</span>
            <input
              className="control"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={enviando}
            />
          </label>

          <button type="submit" className="btn btn--primario btn--bloque" disabled={enviando}>
            {enviando ? "Verificando…" : "Entrar al sistema"}
          </button>
        </form>

        <div className="login__pie">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icono nombre="candado" tamano={13} />
            Conexión interna · la sesión no se guarda en el navegador
          </span>
        </div>
      </section>
    </div>
  );
}
