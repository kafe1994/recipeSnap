#!/bin/bash

# Servidor simple de demostración para RecipeSnap
echo "🚀 RecipeSnap - Demo Server"
echo "=========================="

# Verificar si Python está disponible
if command -v python3 >/dev/null 2>&1; then
    echo "✅ Python 3 encontrado"
    PYTHON_CMD="python3"
elif command -v python >/dev/null 2>&1; then
    echo "✅ Python encontrado"
    PYTHON_CMD="python"
else
    echo "❌ Python no encontrado"
    echo "Instalando Python..."
    apt-get update && apt-get install -y python3
    PYTHON_CMD="python3"
fi

# Crear directorio de demo
mkdir -p demo-server
cp demo.html demo-server/index.html

# Iniciar servidor
echo "🌟 Iniciando servidor de demostración..."
echo ""
echo "📱 RecipeSnap Demo estará disponible en:"
echo "   🌐 http://localhost:5173"
echo "   🌐 http://0.0.0.0:5173"
echo ""
echo "💡 Funcionalidades disponibles en el demo:"
echo "   ✅ Subida de imágenes"
echo "   ✅ Sistema de monedas"
echo "   ✅ Generación de recetas"
echo "   ✅ Diseño móvil responsive"
echo "   ✅ Interfaz idéntica a la app completa"
echo ""
echo "🔗 Para la versión completa con IA:"
echo "   📋 Transferir a PC con: tar -czf recipesnap.tar.gz recipeSnap-mobile/"
echo "   📋 Seguir instrucciones en: SOLUCION-DEFINITIVA.md"
echo ""

cd demo-server
$PYTHON_CMD -m http.server 5173 --bind 0.0.0.0