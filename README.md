# 🍳 RecipeSnap - Recetas IA

Una aplicación web que genera recetas personalizadas a partir de fotos de ingredientes usando inteligencia artificial.

## ✨ Características

- **Reconocimiento de Imágenes**: Analiza fotos de ingredientes con IA
- **Recetas Personalizadas**: Genera recetas específicas según ingredientes
- **Sistema de Monedas**: Monetización con sistema de créditos
- **PWA**: Instalable como aplicación nativa
- **Mobile-First**: Optimizado para dispositivos móviles
- **Fallback Inteligente**: Funciona sin conexión a IA

## 🚀 Deploy en Cloudflare Pages

### 1. Preparación del Repositorio

```bash
# 1. Crear nuevo repositorio en GitHub
# 2. Subir todos los archivos de esta carpeta
git init
git add .
git commit -m "Initial commit: RecipeSnap app"
git branch -M main
git remote add origin https://github.com/TU_USERNAME/recipesnap.git
git push -u origin main
```

### 2. Conectar con Cloudflare Pages

1. **Ir al Dashboard de Cloudflare**
   - [dash.cloudflare.com](https://dash.cloudflare.com)
   - Seleccionar "Pages" en el menú lateral

2. **Crear Nuevo Proyecto**
   - Click en "Create a project"
   - Conectar con GitHub
   - Seleccionar el repositorio de RecipeSnap

3. **Configurar Build Settings**
   ```
   Build command: npm run build
   Build output directory: dist
   Node version: 18
   Environment: Production
   ```

### 3. Configurar Variables de Entorno

**OBLIGATORIO**: Configurar la API key de Gemini

1. **En el proyecto de Cloudflare Pages:**
   - Ve a **Settings** → **Environment variables**
   - Agregar variable:

   ```
   Nombre: GEMINI_API_KEY
   Valor: tu_api_key_aqui
   Environment: Production, Preview, Development
   ```

2. **Obtener API Key de Gemini:**
   - Ir a [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Crear nueva API key gratuita
   - **Límites**: 60 requests/min, 1500 requests/día

### 4. Configurar Cloudflare Worker

1. **Instalar Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login en Cloudflare**
   ```bash
   wrangler login
   ```

3. **Desplegar Worker**
   ```bash
   wrangler publish
   ```

4. **Configurar Routes**
   - El Worker maneja automáticamente las rutas `/api/generate-recipe`

## 🛠️ Estructura del Proyecto

```
recipesnap-final/
├── src/
│   ├── components/          # Componentes React
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Utilidades
│   ├── pages/              # Páginas principales
│   └── main.tsx            # Entry point
├── functions/              # Cloudflare Worker
│   └── _worker.js          # Handler de API
├── public/                 # Archivos estáticos
│   ├── icons/              # Iconos PWA
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service Worker
├── package.json            # Dependencias
├── wrangler.toml           # Configuración Worker
├── vite.config.ts          # Configuración Vite
└── tailwind.config.ts      # Configuración Tailwind
```

## 🎯 Funcionalidades Principales

### Subida de Imágenes
- Soporte para JPG, PNG, WebP
- Máximo 10MB por imagen
- Vista previa inmediata
- Optimización automática

### Generación de Recetas
- Análisis con Gemini AI (si está configurado)
- Fallback inteligente sin IA
- Recetas personalizadas
- Información nutricional
- Tips de cocina

### Sistema de Monedas
- 50 monedas iniciales
- -10 monedas por receta generada
- +10 monedas por anuncio visto
- Interfaz visual clara

### PWA Features
- Instalable en dispositivos móviles
- Service Worker para offline
- Notificaciones de actualización
- Experiencia nativa

## 🔧 Configuración Técnica

### Variables de Entorno

```bash
# API de Gemini (obligatoria)
GEMINI_API_KEY=tu_api_key_aqui

# Configuración opcional
VITE_APP_NAME=RecipeSnap
VITE_VERSION=1.0.0
```

### APIs Utilizadas

1. **Google Gemini AI**
   - Análisis de imágenes
   - Generación de texto
   - Reconocimiento de objetos

2. **Cloudflare Pages**
   - Hosting estático
   - CDN global
   - Deploy automático

3. **Cloudflare Workers**
   - Proxy de API
   - Manejo de requests
   - Caching inteligente

## 🐛 Solución de Problemas

### No aparece el mensaje de demo ✅
- **Solucionado**: La aplicación funciona directamente sin modales

### Error de API de Gemini
```
Error: API key no configurada
```
- **Solución**: Verificar variable `GEMINI_API_KEY` en Cloudflare

### Error de Worker
```
Error: Worker not found
```
- **Solución**: Verificar que el Worker esté desplegado correctamente

### Imágenes no se procesan
- Verificar tamaño máximo (10MB)
- Formatos soportados: JPG, PNG, WebP
- Revisar conexión a internet

## 📱 Compatibilidad

- **Navegadores**: Chrome, Safari, Firefox, Edge (versiones modernas)
- **Dispositivos**: Desktop, Tablet, Móvil
- **Sistemas**: Windows, macOS, Linux, Android, iOS
- **Resoluciones**: Responsive desde 320px

## 🔄 Actualizaciones

Para actualizar la aplicación:

1. Hacer cambios en el código
2. Commit y push a GitHub
3. Cloudflare redeploy automático
4. Verificar en dashboard de Pages

## 📄 Licencia

MIT License - Ver archivo `LICENSE` para detalles.

## 👨‍💻 Desarrollado por

MiniMax Agent - 2025

## 📞 Soporte

Si tienes problemas:
1. Revisar logs en Cloudflare Dashboard
2. Verificar variables de entorno
3. Comprobar estado del Worker
4. Testear en diferentes navegadores

---

🎉 **¡RecipeSnap está listo para el deploy!**

La aplicación funciona completamente sin el mensaje de demo y con reconocimiento de imágenes mejorado.
