import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  api,
  guardarToken,
  limpiarToken,
  registrarManejadorSesionExpirada
} from "../api/client.js";

// Contexto de sesión. El token no se persiste: al recargar hay que entrar de nuevo.
const ContextoAuth = createContext(null);

export function ProveedorAuth({ children }) {
  const [sesion, setSesion] = useState(null); // { codigoUsuario, token }
  const [mensajeSesion, setMensajeSesion] = useState("");

  const cerrarSesion = useCallback((motivo) => {
    limpiarToken();
    setSesion(null);
    setMensajeSesion(motivo || "");
  }, []);

  // Si el backend responde 401 en cualquier petición, se cierra la sesión.
  useEffect(() => {
    registrarManejadorSesionExpirada(() => cerrarSesion("La sesión expiró. Ingrese de nuevo."));
  }, [cerrarSesion]);

  const iniciarSesion = useCallback(async (codigoUsuario, password) => {
    const datos = await api.login(codigoUsuario, password);
    const token = datos && datos.token;
    if (!token) throw new Error("La respuesta del servidor no incluyó un token");
    guardarToken(token);
    setMensajeSesion("");
    setSesion({ codigoUsuario: codigoUsuario, token: token });
  }, []);

  const valor = useMemo(
    () => ({
      sesion: sesion,
      autenticado: Boolean(sesion),
      mensajeSesion: mensajeSesion,
      iniciarSesion: iniciarSesion,
      cerrarSesion: cerrarSesion
    }),
    [sesion, mensajeSesion, iniciarSesion, cerrarSesion]
  );

  return <ContextoAuth.Provider value={valor}>{children}</ContextoAuth.Provider>;
}

export function useAuth() {
  const contexto = useContext(ContextoAuth);
  if (!contexto) throw new Error("useAuth debe usarse dentro de ProveedorAuth");
  return contexto;
}
