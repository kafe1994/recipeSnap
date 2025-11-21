# Configuración para GitHub Pages/Cloudflare Pages
# Este archivo debe configurarse en el dashboard de Cloudflare

# Build Settings en Cloudflare Pages:
# Build command: npm run build
# Build output directory: dist
# Node version: 18

# Variables de Entorno Requeridas:
# GEMINI_API_KEY = [Tu API key de Google Gemini]

# El Worker en /functions/_worker.js manejará automáticamente las rutas de API
# No requiere configuración adicional una vez desplegado

# Estructura de rutas manejadas:
# /api/generate-recipe - POST request para generar recetas
# /api/health - GET request para verificar estado del servicio

# Para deploy local:
# npm install
# npm run build
# wrangler publish
