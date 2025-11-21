import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Configuración para evitar errores de red en servidores
    host: process.env.VITE_HOST || '0.0.0.0',
    port: parseInt(process.env.VITE_PORT) || 5173,
    // Configuraciones adicionales para estabilidad
    strictPort: false,
    cors: true,
    // Detectar interfaces automáticamente pero con fallback
    detectHost: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  define: {
    // Variables de entorno seguras
    global: 'globalThis',
  }
})