// -----------------------------------------------------------------------------
// Cliente HTTP centralizado.
// -----------------------------------------------------------------------------

export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

let tokenEnMemoria = null;
let alPerderSesion = null; // callback que el contexto de auth registra

export function guardarToken(token) {
  tokenEnMemoria = token;
}

export function obtenerToken() {
  return tokenEnMemoria;
}

export function limpiarToken() {
  tokenEnMemoria = null;
}

// Permite que AuthContext reaccione a un 401 (token vencido) cerrando sesión.
export function registrarManejadorSesionExpirada(callback) {
  alPerderSesion = callback;
}

export class ErrorApi extends Error {
  constructor(mensaje, status) {
    super(mensaje);
    this.name = "ErrorApi";
    this.status = status;
  }
}

// Intenta sacar un mensaje útil del cuerpo de error del backend.
async function leerMensajeDeError(respuesta) {
  let cuerpo = null;
  try {
    cuerpo = await respuesta.json();
  } catch (e) {
    cuerpo = null;
  }
  if (cuerpo) {
    const posible = cuerpo.message || cuerpo.mensaje || cuerpo.error || cuerpo.detail;
    if (posible) return posible;
  }
  if (respuesta.status === 401) return "Sesión no válida o expirada";
  if (respuesta.status === 403) return "No tiene permisos para esta operación";
  if (respuesta.status === 404) return "Recurso no encontrado";
  if (respuesta.status >= 500) return "Error interno del servidor";
  return "La petición falló (HTTP " + respuesta.status + ")";
}

// Punto único de salida a la red: arma la URL, las cabeceras y el Authorization.
async function peticion(ruta, opciones) {
  const config = opciones || {};
  const metodo = config.metodo || "GET";
  const requiereAuth = config.requiereAuth !== false; // por defecto, sí

  const cabeceras = { Accept: "application/json" };
  if (config.cuerpo !== undefined) cabeceras["Content-Type"] = "application/json";
  if (requiereAuth) {
    if (!tokenEnMemoria) throw new ErrorApi("No hay sesión activa", 401);
    cabeceras.Authorization = "Bearer " + tokenEnMemoria;
  }

  let respuesta;
  try {
    respuesta = await fetch(API_BASE + ruta, {
      method: metodo,
      headers: cabeceras,
      body: config.cuerpo !== undefined ? JSON.stringify(config.cuerpo) : undefined
    });
  } catch (e) {
    // Falla de red / CORS / servidor caído
    throw new ErrorApi("No se pudo conectar con el servidor (" + API_BASE + ")", 0);
  }

  if (!respuesta.ok) {
    const mensaje = await leerMensajeDeError(respuesta);
    if (respuesta.status === 401 && requiereAuth && alPerderSesion) alPerderSesion();
    throw new ErrorApi(mensaje, respuesta.status);
  }

  if (respuesta.status === 204) return null;
  const texto = await respuesta.text();
  if (!texto) return null;
  try {
    return JSON.parse(texto);
  } catch (e) {
    return texto;
  }
}

export const api = {
  // Único endpoint público.
  login: (codigoUsuario, password) =>
    peticion("/api/auth/login", {
      metodo: "POST",
      cuerpo: { codigoUsuario: codigoUsuario, password: password },
      requiereAuth: false
    }),

  // ===== CATÁLOGOS (lecturas para dropdowns) =====
  clientes: () => peticion("/api/clientes"),
  agencias: () => peticion("/api/agencias"),
  motivos: () => peticion("/api/motivo-transaccion"),
  canales: () => peticion("/api/canal-servicio"),
  usuarios: () => peticion("/api/usuarios"),
  tiposCliente: () => peticion("/api/tipos-cliente"),
  tiposTransaccion: () => peticion("/api/tipos-transacciones"),

  // ===== CRUD CLIENTES =====
  crearCliente: (datos) => peticion("/api/clientes", { metodo: "POST", cuerpo: datos }),
  actualizarCliente: (id, datos) => peticion("/api/clientes/" + id, { metodo: "PUT", cuerpo: datos }),
  eliminarCliente: (id) => peticion("/api/clientes/" + id, { metodo: "DELETE" }),

  // ===== CRUD AGENCIAS =====
  crearAgencia: (datos) => peticion("/api/agencias", { metodo: "POST", cuerpo: datos }),
  actualizarAgencia: (id, datos) => peticion("/api/agencias/" + id, { metodo: "PUT", cuerpo: datos }),
  eliminarAgencia: (id) => peticion("/api/agencias/" + id, { metodo: "DELETE" }),

  // ===== CRUD CANALES DE SERVICIO =====
  crearCanal: (datos) => peticion("/api/canal-servicio", { metodo: "POST", cuerpo: datos }),
  actualizarCanal: (id, datos) => peticion("/api/canal-servicio/" + id, { metodo: "PUT", cuerpo: datos }),
  eliminarCanal: (id) => peticion("/api/canal-servicio/" + id, { metodo: "DELETE" }),

  // ===== CRUD MOTIVOS DE TRANSACCIÓN =====
  crearMotivo: (datos) => peticion("/api/motivo-transaccion", { metodo: "POST", cuerpo: datos }),
  actualizarMotivo: (id, datos) => peticion("/api/motivo-transaccion/" + id, { metodo: "PUT", cuerpo: datos }),
  eliminarMotivo: (id) => peticion("/api/motivo-transaccion/" + id, { metodo: "DELETE" }),

  // ===== CRUD TIPOS DE TRANSACCIÓN =====
  crearTipoTransaccion: (datos) => peticion("/api/tipos-transacciones", { metodo: "POST", cuerpo: datos }),
  actualizarTipoTransaccion: (id, datos) => peticion("/api/tipos-transacciones/" + id, { metodo: "PUT", cuerpo: datos }),
  eliminarTipoTransaccion: (id) => peticion("/api/tipos-transacciones/" + id, { metodo: "DELETE" }),

  // ===== CRUD TIPOS DE CLIENTE =====
  crearTipoCliente: (datos) => peticion("/api/tipos-cliente", { metodo: "POST", cuerpo: datos }),
  actualizarTipoCliente: (id, datos) => peticion("/api/tipos-cliente/" + id, { metodo: "PUT", cuerpo: datos }),
  eliminarTipoCliente: (id) => peticion("/api/tipos-cliente/" + id, { metodo: "DELETE" }),

  // ===== CRUD USUARIOS =====
  crearUsuario: (datos) => peticion("/api/usuarios", { metodo: "POST", cuerpo: datos }),
  actualizarUsuario: (id, datos) => peticion("/api/usuarios/" + id, { metodo: "PUT", cuerpo: datos }),
  eliminarUsuario: (id) => peticion("/api/usuarios/" + id, { metodo: "DELETE" }),

  // ===== TRANSACCIONES Y REPORTE =====
  crearTransaccion: (datos) => peticion("/api/transacciones", { metodo: "POST", cuerpo: datos }),
  reporteDiario: (fecha) =>
    peticion("/api/transacciones/reporte?fecha=" + encodeURIComponent(fecha))
};