#!/bin/bash

# Script para iniciar RecipeSnap sin errores de red
echo "🚀 Iniciando RecipeSnap..."

# Detectar si estamos en un entorno con problemas de red
echo "📡 Detectando entorno de red..."

# Intentar obtener interfaz de red
if command -v ip >/dev/null 2>&1; then
    echo "✅ Interfaz de red detectada"
    # Agregar interfaz lo si no existe
    ip link show lo >/dev/null 2>&1 || ip link add lo type dummy
else
    echo "⚠️  Interfaz de red no detectada, configurando..."
    # En caso extremo, usar configuración básica
fi

# Verificar dependencias
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Iniciar servidor con configuración robusta
echo "🌟 Iniciando servidor de desarrollo..."
echo "📱 La app estará disponible en:"
echo "   🌐 http://localhost:5173"
echo "   🌐 http://0.0.0.0:5173"
echo ""
echo "💡 Para acceder desde otro dispositivo en la red:"
echo "   🔗 http://$(hostname -I | awk '{print $1}'):5173"
echo ""

# Ejecutar con host explícito
npm run dev -- --host 0.0.0.0 --port 5173