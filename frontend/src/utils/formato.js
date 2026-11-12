// Utilidades de formato para montos y fechas. Todo en es-HN (Lempiras).

const formateadorMonto = new Intl.NumberFormat("es-HN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

// 1234.5 -> "L 1,234.50"
export function formatearLempiras(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return "L 0.00";
  return "L " + formateadorMonto.format(numero);
}

// Acepta "2026-08-13T14:32:00", "2026-08-13" o "13/08/2026" y devuelve algo legible.
export function formatearFechaHora(valor) {
  if (!valor) return "—";
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return String(valor);
  const dosDigitos = (n) => String(n).padStart(2, "0");
  const dia = dosDigitos(fecha.getDate());
  const mes = dosDigitos(fecha.getMonth() + 1);
  const anio = String(fecha.getFullYear()).slice(2);
  const tieneHora = /\d{2}:\d{2}/.test(String(valor));
  const hora = tieneHora ? " " + dosDigitos(fecha.getHours()) + ":" + dosDigitos(fecha.getMinutes()) : "";
  return dia + "/" + mes + "/" + anio + hora;
}

// Fecha de hoy en formato YYYY-MM-DD para el input date.
export function fechaDeHoy() {
  const hoy = new Date();
  const dosDigitos = (n) => String(n).padStart(2, "0");
  return hoy.getFullYear() + "-" + dosDigitos(hoy.getMonth() + 1) + "-" + dosDigitos(hoy.getDate());
}
