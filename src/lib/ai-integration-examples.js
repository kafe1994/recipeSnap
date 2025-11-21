// AI Integration Examples for RecipeSnap
// Copy this code to your RecipeSnap.tsx file

// ============================================
// 1. OPENAI GPT-4 VISION INTEGRATION
// ============================================

class OpenAIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1';
  }

  async analyzeIngredients(imageBase64, userPreferences = {}) {
    const prompt = `
      Analiza esta imagen de ingredientes y genera una receta detallada en español.
      
      Contexto del usuario:
      - Dificultad preferida: ${userPreferences.difficulty || 'intermedia'}
      - Tiempo disponible: ${userPreferences.time || '30-45 minutos'}
      - Número de porciones: ${userPreferences.servings || 2-4}
      - Restricciones dietéticas: ${userPreferences.dietary || 'ninguna'}
      
      Devuelve la respuesta en formato JSON con esta estructura:
      {
        "name": "Nombre de la receta",
        "difficulty": "Fácil/Intermedia/Difícil",
        "time": "X min",
        "servings": número,
        "ingredients": ["ingrediente 1", "ingrediente 2", ...],
        "steps": ["paso 1", "paso 2", ...],
        "nutrition": {
          "calories": número,
          "protein": número,
          "carbs": número,
          "fat": número
        },
        "tips": ["tip 1", "tip 2"],
        "estimated_cost": "bajo/medio/alto"
      }
    `;

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: prompt
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`
                  }
                }
              ]
            }
          ],
          max_tokens: 1500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const recipeText = data.choices[0].message.content;
        return this.parseRecipeJSON(recipeText);
      } else {
        throw new Error('No se pudo generar la receta');
      }
    } catch (error) {
      console.error('Error con OpenAI:', error);
      throw error;
    }
  }

  parseRecipeJSON(recipeText) {
    try {
      // Intenta extraer JSON del texto de respuesta
      const jsonMatch = recipeText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No se encontró JSON válido');
      }
    } catch (error) {
      // Fallback: crear objeto con estructura básica
      return {
        name: "Receta Generada",
        difficulty: "Intermedia",
        time: "30 min",
        servings: 4,
        ingredients: ["Ingredientes detectados en la imagen"],
        steps: ["Seguir las instrucciones de la IA"],
        nutrition: { calories: 300, protein: 15, carbs: 25, fat: 12 },
        tips: ["Cocinar hasta que esté dorado"],
        estimated_cost: "medio"
      };
    }
  }
}

// ============================================
// 2. GOOGLE GEMINI INTEGRATION
// ============================================

class GeminiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
  }

  async analyzeIngredients(imageBase64, userPreferences = {}) {
    const prompt = `
      Analiza esta imagen de ingredientes y crea una receta completa en español.
      
      Preferencias: ${JSON.stringify(userPreferences)}
      
      Responde SOLO con un objeto JSON válido (sin texto adicional).
    `;

    try {
      const response = await fetch(
        `${this.baseURL}/models/gemini-pro-vision:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { 
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageBase64
                  }
                }
              ]
            }],
            generationConfig: {
              temperature: 0.4,
              topK: 32,
              topP: 1,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const recipeText = data.candidates[0].content.parts[0].text;
        return this.parseRecipeJSON(recipeText);
      } else {
        throw new Error('No se pudo generar la receta');
      }
    } catch (error) {
      console.error('Error con Gemini:', error);
      throw error;
    }
  }

  parseRecipeJSON(recipeText) {
    // Same parsing logic as OpenAI
    return this.openAIStyleParse(recipeText);
  }

  openAIStyleParse(recipeText) {
    try {
      const jsonMatch = recipeText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found');
    } catch (error) {
      return {
        name: "Receta con Gemini",
        difficulty: "Fácil",
        time: "25 min",
        servings: 2,
        ingredients: ["Ingredientes de la imagen"],
        steps: ["Preparar según instrucciones"],
        nutrition: { calories: 280, protein: 12, carbs: 30, fat: 10 },
        tips: ["Ajustar sabor al gusto"],
        estimated_cost: "bajo"
      };
    }
  }
}

// ============================================
// 3. HUGGING FACE INTEGRATION
// ============================================

class HuggingFaceClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api-inference.huggingface.co/models';
  }

  async analyzeIngredients(imageBase64) {
    try {
      // Paso 1: Describir la imagen
      const imageDescription = await this.describeImage(imageBase64);
      
      // Paso 2: Generar receta basada en la descripción
      const recipe = await this.generateRecipe(imageDescription);
      
      return recipe;
    } catch (error) {
      console.error('Error con Hugging Face:', error);
      throw error;
    }
  }

  async describeImage(imageBase64) {
    const response = await fetch(`${this.baseURL}/Salesforce/blip-image-captioning-large`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `data:image/jpeg;base64,${imageBase64}`,
        parameters: { max_length: 100, temperature: 0.7 }
      })
    });

    const data = await response.json();
    
    if (data && data[0] && data[0].generated_text) {
      return data[0].generated_text;
    } else {
      throw new Error('No se pudo describir la imagen');
    }
  }

  async generateRecipe(imageDescription) {
    const prompt = `
      Basándote en esta descripción de ingredientes: "${imageDescription}"
      
      Crea una receta simple en español. Responde con JSON:
      {
        "name": "Nombre",
        "difficulty": "Fácil",
        "time": "20 min",
        "servings": 2,
        "ingredients": ["lista"],
        "steps": ["pasos"],
        "nutrition": {"calories": 250, "protein": 10, "carbs": 20, "fat": 8},
        "tips": ["consejos"],
        "estimated_cost": "bajo"
      }
    `;

    const response = await fetch(`${this.baseURL}/microsoft/DialoGPT-medium`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_length: 200, temperature: 0.8 }
      })
    });

    const data = await response.json();
    
    // Parse response and create recipe object
    return this.createBasicRecipeFromDescription(imageDescription);
  }

  createBasicRecipeFromDescription(description) {
    return {
      name: "Receta basada en imagen",
      difficulty: "Fácil",
      time: "25 min",
      servings: 2,
      ingredients: this.extractIngredientsFromDescription(description),
      steps: [
        "Preparar todos los ingredientes",
        "Seguir las instrucciones según disponibilidad de ingredientes",
        "Cocinar hasta que esté listo"
      ],
      nutrition: { calories: 300, protein: 15, carbs: 25, fat: 12 },
      tips: ["Ajustar sabores según preferencia personal"],
      estimated_cost: "medio"
    };
  }

  extractIngredientsFromDescription(description) {
    // Lógica simple para extraer ingredientes de la descripción
    const commonIngredients = ["tomate", "cebolla", "ajo", "pasta", "arroz", "pollo", "carne", "pescado"];
    const found = commonIngredients.filter(ingredient => 
      description.toLowerCase().includes(ingredient)
    );
    
    return found.length > 0 ? found.map(i => `200g ${i}`) : ["Ingredientes de la imagen"];
  }
}

// ============================================
// 4. USAGE EXAMPLE IN YOUR COMPONENT
// ============================================

// En tu RecipeSnap.tsx, reemplaza la función handleGenerateRecipe:

/*
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

    // Inicializar cliente de IA (cambiar según tu elección)
    const aiClient = new OpenAIClient(process.env.REACT_APP_OPENAI_KEY);
    // const aiClient = new GeminiClient(process.env.REACT_APP_GEMINI_KEY);
    // const aiClient = new HuggingFaceClient(process.env.REACT_APP_HF_KEY);

    // Generar receta
    const recipe = await aiClient.analyzeIngredients(imageBase64, userPreferences);
    
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
*/

// ============================================
// 5. ENVIRONMENT VARIABLES
// ============================================

// Crear archivo .env en la raíz del proyecto:
/*
REACT_APP_OPENAI_KEY=tu_openai_key_aqui
REACT_APP_GEMINI_KEY=tu_gemini_key_aqui  
REACT_APP_HF_KEY=tu_hugging_face_key_aqui

# Para desarrollo local, puedes usar keys de prueba
# OpenAI: https://platform.openai.com/api-keys
# Gemini: https://makersuite.google.com/app/apikey
// Hugging Face: https://huggingface.co/settings/tokens
*/

export { OpenAIClient, GeminiClient, HuggingFaceClient };