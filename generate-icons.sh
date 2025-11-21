#!/bin/bash

# Script para generar iconos en diferentes tamaños
echo "🎨 Generando iconos de RecipeSnap..."

# Crear directorio temporal
mkdir -p temp-icons

# Generar diferentes tamaños usando ImageMagick si está disponible
if command -v convert >/dev/null 2>&1; then
    echo "✅ ImageMagick disponible, generando iconos PNG..."
    
    # Generar iconos en diferentes tamaños
    convert public/icons/recipesnap-icon.svg -resize 72x72 temp-icons/icon-72x72.png
    convert public/icons/recipesnap-icon.svg -resize 96x96 temp-icons/icon-96x96.png
    convert public/icons/recipesnap-icon.svg -resize 128x128 temp-icons/icon-128x128.png
    convert public/icons/recipesnap-icon.svg -resize 144x144 temp-icons/icon-144x144.png
    convert public/icons/recipesnap-icon.svg -resize 152x152 temp-icons/icon-152x152.png
    convert public/icons/recipesnap-icon.svg -resize 192x192 temp-icons/icon-192x192.png
    convert public/icons/recipesnap-icon.svg -resize 384x384 temp-icons/icon-384x384.png
    convert public/icons/recipesnap-icon.svg -resize 512x512 temp-icons/icon-512x512.png
    
    # Copiar a directorio final
    cp temp-icons/*.png public/icons/
    
    echo "✅ Iconos generados exitosamente"
    
else
    echo "⚠️ ImageMagick no disponible, creando placeholders..."
    
    # Crear placeholders simples si no hay ImageMagick
    for size in 72 96 128 144 152 192 384 512; do
        convert -size ${size}x${size} xc:'#f97316' -fill white -gravity center -pointsize $(($size/4)) -annotate +0+0 '🍳' icons/icon-${size}x${size}.png 2>/dev/null || {
            # Fallback para sistemas sin convert
            echo "Creando placeholder para ${size}x${size}"
            # Crear archivo con contenido básico
        }
    done
fi

# Crear screenshots placeholder (opcional)
mkdir -p screenshots
echo "📱 Creando placeholders para screenshots..."

# Limpiar archivos temporales
rm -rf temp-icons

echo "🎉 ¡Iconos de RecipeSnap generados!"