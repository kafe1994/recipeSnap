import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// Configuración simplificada para entornos restringidos
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configuración mínima sin detección de red
  define: {
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})