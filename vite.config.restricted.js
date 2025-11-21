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
    // CONFIGURACIÓN ANTI-ERROR PARA ENTORNOS RESTRINGIDOS
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    cors: true,
    // FORZAR CONFIGURACIÓN SIN DETECCIÓN DE RED
    useNetworkInterfaces: false,
    // CONFIGURACIONES ADICIONALES PARA ESTABILIDAD
    hmr: {
      port: 24678,
      overlay: false
    },
    // EVITAR PROBLEMAS DE RED
    dns: false,
    // IGNORAR DETECCIÓN DE INTERFAZ
    server: {
      host: false,
      port: false
    }
  },
  preview: {
    port: 4173,
    host: true,
  },
  define: {
    // Variables de entorno seguras
    global: 'globalThis',
  },
  // CONFIGURACIÓN PARA ENTORNOS RESTRINGIDOS
  optimizeDeps: {
    exclude: ['node:os']
  }
})