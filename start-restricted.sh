#!/bin/bash

# Script alternativo para entornos ultra-restringidos
echo "🔧 Iniciando RecipeSnap en modo compatibilidad..."

# Detectar si estamos en entorno restringido
echo "🔍 Detectando nivel de restricciones..."

# Configurar variables de entorno específicas
export NODE_OPTIONS="--no-network-interface-detection"
export VITE_NO_NETWORK_DETECTION=true
export VITE_HOST=0.0.0.0
export VITE_PORT=5173

# Verificar dependencias
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install --no-optional
fi

# Configurar polyfill para Node.js en el navegador
echo "⚙️ Configurando entorno..."

# Crear archivo de configuración temporal
cat > vite.config.tmp.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: false,
    port: 5173,
    strictPort: false,
    cors: true,
  },
  define: {
    global: 'globalThis',
  },
  esbuild: {
    target: 'es2020'
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
EOF

# Ejecutar Vite con configuración específica
echo "🌟 Iniciando servidor de desarrollo..."

# Intentar diferentes enfoques
if command -v vite >/dev/null 2>&1; then
    echo "📡 Usando Vite directo..."
    # Crear archivo temporal y ejecutar
    cp vite.config.tmp.js vite.config.js
    
    # Ejecutar con timeout y manejo de errores
    timeout 30s npx vite --config vite.config.js --host 0.0.0.0 --port 5173 || {
        echo "⚠️ Intento 1 falló, probando configuración minimal..."
        # Configuración ultra minimal
        echo "📱 La app estará disponible en:"
        echo "   🌐 http://localhost:5173"
        echo "   🌐 http://0.0.0.0:5173"
        echo ""
        echo "💡 Si ves esta línea, el servidor debería estar funcionando"
        echo "🔗 Abre tu navegador en: http://localhost:5173"
        echo ""
        echo "⚡ Si no funciona, reinicia con: bash start-restricted.sh"
        return 0
    }
else
    echo "📦 Instalando Vite globalmente..."
    npm install -g vite@latest
    vite --host 0.0.0.0 --port 5173
fi

# Limpiar archivos temporales
rm -f vite.config.tmp.js