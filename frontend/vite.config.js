import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración mínima. El puerto del front es 5173; la API vive en 8080.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Si la API no envía cabeceras CORS, descomenta el proxy y define
    // VITE_API_BASE="/api-proxy" en un archivo .env.local
    // proxy: {
    //   "/api-proxy": {
    //     target: "http://localhost:8080",
    //     changeOrigin: true,
    //     rewrite: (ruta) => ruta.replace(/^\/api-proxy/, "")
    //   }
    // }
  }
});
