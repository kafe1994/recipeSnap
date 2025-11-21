# Guía: Cómo Probar RecipeSnap en Local con Google Gemini

## 🚀 Paso 1: Configurar Google Gemini API

### 1.1 Obtener API Key Gratuita
```bash
# Ve a: https://makersuite.google.com/app/apikey
# 1. Inicia sesión con tu cuenta Google
# 2. Haz clic en "Create API Key"  
# 3. Copia la API key generada
# 4. Es GRATIS con 1,500 requests/día
```

### 1.2 Configurar Variables de Entorno
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env y reemplaza:
REACT_APP_GEMINI_KEY=tu_api_key_real_aqui
```

## 🖥️ Paso 2: Probar en Local

### 2.1 Instalar Dependencias
```bash
# En el directorio del proyecto
cd recipeSnap-mobile

# Instalar dependencias
npm install
# o si prefieres yarn
yarn install
```

### 2.2 Ejecutar Servidor de Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
# o con yarn
yarn dev

# La app estará disponible en: http://localhost:5173
```

### 2.3 Verificar Funcionamiento
```
✅浏览器 http://localhost:5173
✅ Cargar imagen de ingredientes
✅ Hacer clic en "Generar Receta" 
✅ Verificar que se descuente 1 moneda
✅ Confirmar que aparece la receta generada
```

## 🔧 Paso 3: Integrar Gemini en RecipeSnap.tsx

### 3.1 Importar Gemini Client
```javascript
// En src/pages/RecipeSnap.tsx, agrega al inicio:
import GeminiClient from '../lib/gemini-client';
```

### 3.2 Reemplazar Función de Generación
```javascript
const handleGenerateRecipe = async () => {
  if (coins < 10) {
    toast({
      title: "Monedas insuficientes",
      description: "Mira un anuncio para ganar más monedas",
      variant: "destructive",
    });
    return;
  }

  setIsGenerating(true);
  setCoins((prev) => prev - 10);

  try {
    // Convertir imagen a base64
    const imageBase64 = uploadedImage.replace(/^data:image\/[a-z]+;base64,/, "");
    
    // Configurar preferencias del usuario
    const userPreferences = {
      difficulty: "intermedia",
      time: "30-45 minutos", 
      servings: "2-4",
      dietary: "ninguna"
    };

    // Usar Gemini para generar receta
    const apiKey = process.env.REACT_APP_GEMINI_KEY;
    if (!apiKey) {
      throw new Error('API Key de Gemini no configurada');
    }

    const geminiClient = new GeminiClient(apiKey);
    const recipe = await geminiClient.analyzeIngredients(imageBase64, userPreferences);
    
    setRecipe(recipe);
    
    toast({
      title: "¡Receta generada!",
      description: "Tu receta personalizada está lista",
    });
    
  } catch (error) {
    console.error('Error generando receta:', error);
    
    // Fallback a receta simulada
    setRecipe({
      name: "Pasta con Ingredientes de la Imagen",
      difficulty: "Fácil",
      time: "20 min",
      servings: 2,
      ingredients: ["Ingredientes detectados", "Sal", "Aceite", "Especias"],
      steps: [
        "Preparar todos los ingredientes",
        "Cocinar según el método preferido",
        "Servir caliente"
      ],
      nutrition: { calories: 350, protein: 12, carbs: 45, fat: 15 },
      tips: ["Ajustar sabores al gusto"],
      estimated_cost: "bajo"
    });
    
    toast({
      title: "Receta básica generada",
      description: "Usa ingredientes de la imagen para crear tu plato",
    });
  } finally {
    setIsGenerating(false);
  }
};
```

## 🧪 Paso 4: Probar Funcionalidad

### 4.1 Pruebas Recomendadas
```bash
# 1. Prueba con imágenes reales de ingredientes
# 2. Verifica que se descuento monedas
# 3. Confirma que las recetas son coherentes
# 4. Prueba diferentes tipos de ingredientes
# 5. Verifica manejo de errores
```

### 4.2 Debugging
```javascript
// Si hay errores, revisa la consola del navegador:
// F12 -> Console para ver logs detallados
console.log('Gemini Response:', recipeText);
```

## 📱 Paso 5: Probar en Móvil

### 5.1 Vista Móvil en Desktop
```bash
# En Chrome/Edge:
# F12 -> Device Mode (Toggle Device Toolbar)
# Selecciona: iPhone, Android, etc.
```

### 5.2 Pruebas en Dispositivo Real
```bash
# Opción 1: Conectar móvil por USB
# Opción 2: Usar ngrok para exponer local
npm install -g ngrok
ngrok http 5173
# Luego abre la URL de ngrok en tu móvil
```

## 🔍 Paso 6: Solución de Problemas Comunes

### 6.1 Error: "API Key no válida"
```javascript
// Verifica que el .env tenga la key correcta
// Reinicia el servidor después de cambiar .env
```

### 6.2 Error: "Límite de API excedido"
```javascript
// Gemini free tier: 1,500 requests/día
// Espera 24 horas o usa otra API key
```

### 6.3 Error: "CORS Policy"
```javascript
// Gemini API maneja CORS automáticamente
// Si persiste, revisa la configuración de red
```

### 6.4 La imagen no se procesa
```javascript
// Verifica que la imagen sea:
# - Formato: JPG, PNG, WEBP
# - Tamaño: < 20MB
# - Contenido: Ingredientes visibles
```

## 🎯 Paso 7: Optimizaciones Finales

### 7.1 Mejorar UX
```javascript
// Agregar loading states más específicos
// Mostrar progreso de análisis de imagen
// Cache de recetas populares
```

### 7.2 Preparar para APK
```javascript
// Una vez probado localmente:
# 1. npm run build
# 2. Configurar Capacitor
# 3. Generar APK
```

## ✅ Checklist Final

- [ ] API Key de Gemini configurada
- [ ] Archivo .env creado y configurado
- [ ] npm install ejecutado
- [ ] npm run dev ejecutado exitosamente
- [ ] App carga en http://localhost:5173
- [ ] Subida de imagen funciona
- [ ] Generación de receta con Gemini funciona
- [ ] Vista móvil responsive
- [ ] Manejo de errores implementado
- [ ] Monedas se descuento correctamente

---

## 🆘 ¿Necesitas Ayuda?

Si encuentras problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que la API key sea correcta
3. Confirma que tienes conexión a internet
4. Asegúrate de que la imagen tenga ingredientes visibles

**¡Listo para generar recetas increíbles! 🍳**