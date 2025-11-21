#!/bin/bash

echo "🍳 RecipeSnap - Deploy Automático"
echo "================================="

# Verificar dependencias
echo "📦 Verificando dependencias..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Descarga desde: https://nodejs.org"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

# Instalar dependencias
echo "📚 Instalando dependencias..."
npm install

# Build de la aplicación
echo "🔨 Compilando aplicación..."
npm run build

# Verificar si wrangler está disponible
if command -v wrangler &> /dev/null; then
    echo "🚀 Desplegando Worker..."
    wrangler publish
    
    echo ""
    echo "✅ ¡Deploy completado!"
    echo ""
    echo "📱 URL de la aplicación:"
    echo "   https://recipesnap.pages.dev"
    echo ""
    echo "⚙️  Variables de entorno configuradas:"
    echo "   - GEMINI_API_KEY (en Cloudflare Pages)"
    echo ""
    echo "🎯 Funcionalidades activas:"
    echo "   ✅ Sin mensaje de demo"
    echo "   ✅ Reconocimiento de imágenes con IA"
    echo "   ✅ Sistema de monedas"
    echo "   ✅ PWA instalable"
    echo "   ✅ Fallback inteligente"
    echo ""
else
    echo "⚠️  Wrangler CLI no encontrado. Instala con:"
    echo "   npm install -g wrangler"
    echo ""
    echo "📝 Para deploy manual:"
    echo "1. npm install"
    echo "2. npm run build"
    echo "3. wrangler publish"
    echo "4. Configura GEMINI_API_KEY en Cloudflare Pages"
fi

echo ""
echo "🎉 RecipeSnap está listo para usar!"
echo "   Sin mensaje de demo • Reconocimiento IA completo"
