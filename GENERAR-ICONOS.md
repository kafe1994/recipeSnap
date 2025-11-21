# 📱 Guía Rápida: Generar Iconos RecipeSnap

## 🔧 **Opción 1: Script Automático (Recomendado)**

```bash
cd recipeSnap-mobile
chmod +x generate-icons.sh
bash generate-icons.sh
```

## 🎨 **Opción 2: Manual con Herramienta Web**

### **Si no tienes ImageMagick, usa:**

**🔗 Herramienta Online:**
```
👉 https://www.icoconverter.com/
👉 https://favicon.io/favicon-generator/
👉 https://realfavicongenerator.net/
```

### **Pasos:**
1. **Subir SVG:** Usa `public/icons/recipesnap-icon.svg`
2. **Seleccionar tamaños:** 72, 96, 128, 144, 152, 192, 384, 512
3. **Descargar PNGs**
4. **Copiar a carpeta:**
   ```bash
   mkdir -p public/icons
   # Copiar todos los PNGs aquí
   ```

## 🖼️ **Opción 3: Crear Rápidamente**

**Si necesitas empezar YA:**
```bash
# Crear iconos básicos con ImageMagick
apt-get update && apt-get install -y imagemagick

# Luego ejecutar:
bash generate-icons.sh
```

## 📁 **Estructura Final Esperada:**
```
public/icons/
├── icon-72x72.png
├── icon-96x96.png  
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
```

## ✅ **Verificar Iconos:**
```bash
# Verificar que se crearon
ls -la public/icons/

# Debería mostrar 8 archivos PNG
```