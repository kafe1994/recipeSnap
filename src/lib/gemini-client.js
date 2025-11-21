// Google Gemini AI Client for RecipeSnap
// Integra esta funcionalidad en tu componente RecipeSnap

class GeminiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
  }

  async analyzeIngredients(imageBase64, userPreferences = {}) {
    const prompt = `
      Eres un chef experto especializado en crear recetas con ingredientes disponibles.
      
      Analiza esta imagen de ingredientes y crea una receta completa y detallada en español.
      
      Preferencias del usuario:
      - Dificultad: ${userPreferences.difficulty || 'intermedia'}
      - Tiempo disponible: ${userPreferences.time || '30-45 minutos'}
      - Porciones: ${userPreferences.servings || '2-4 personas'}
      - Restricciones: ${userPreferences.dietary || 'ninguna'}
      
      Responde EXCLUSIVAMENTE con un objeto JSON válido (sin texto adicional) con esta estructura exacta:
      
      {
        "name": "Nombre descriptivo de la receta",
        "difficulty": "Fácil" | "Intermedia" | "Difícil",
        "time": "X min",
        "servings": número,
        "ingredients": [
          "ingrediente principal con cantidad",
          "ingrediente secundario con cantidad"
        ],
        "steps": [
          "paso detallado 1",
          "paso detallado 2",
          "paso detallado 3"
        ],
        "nutrition": {
          "calories": número,
          "protein": número,
          "carbs": número,
          "fat": número
        },
        "tips": [
          "consejo útil 1",
          "consejo útil 2"
        ],
        "estimated_cost": "bajo" | "medio" | "alto",
        "description": "Descripción breve de la receta"
      }
      
      IMPORTANTE: 
      - Identifica correctamente los ingredientes en la imagen
      - Crea recetas prácticas y sabrosas
      - Incluye cantidades realistas
      - Proporciona pasos claros y ordenados
      - Responde solo con el JSON, sin texto adicional
    `;

    try {
      const response = await fetch(
        `${this.baseURL}/models/gemini-pro-vision:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { 
                  text: prompt 
                },
                { 
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageBase64
                  }
                }
              ]
            }],
            generationConfig: {
              temperature: 0.3,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
              stopSequences: ["###"]
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH", 
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const recipeText = data.candidates[0].content.parts[0].text;
        console.log('Gemini Response:', recipeText);
        return this.parseRecipeJSON(recipeText);
      } else {
        console.error('Error en respuesta de Gemini:', data);
        throw new Error('No se pudo generar la receta con Gemini');
      }
    } catch (error) {
      console.error('Error con Gemini:', error);
      throw error;
    }
  }

  parseRecipeJSON(recipeText) {
    try {
      // Limpiar el texto para extraer solo el JSON
      let cleanedText = recipeText.trim();
      
      // Eliminar código markdown si existe
      cleanedText = cleanedText.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
      
      // Buscar el objeto JSON
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('No se encontró JSON válido en la respuesta');
    } catch (error) {
      console.error('Error parseando JSON:', error);
      console.error('Texto recibido:', recipeText);
      
      // Fallback con receta básica
      return {
        name: "Receta Personalizada",
        difficulty: "Intermedia", 
        time: "30 min",
        servings: 2,
        ingredients: [
          "Ingredientes de la imagen - 200g",
          "Sal al gusto",
          "Aceite de oliva - 2 cucharadas",
          "Especias variadas"
        ],
        steps: [
          "Lavar y preparar todos los ingredientes visibles en la imagen",
          "Calentar aceite en una sartén a fuego medio",
          "Cocinar los ingredientes principales durante 10-15 minutos",
          "Sazonar con sal y especias al gusto",
          "Servir caliente y disfrutar"
        ],
        nutrition: { 
          calories: 320, 
          protein: 15, 
          carbs: 28, 
          fat: 18 
        },
        tips: [
          "Ajusta la cocción según el tipo de ingredientes",
          "Experimenta con diferentes especias",
          "Sirve inmediatamente para mejor sabor"
        ],
        estimated_cost: "medio",
        description: "Una deliciosa receta creada con los ingredientes de tu imagen"
      };
    }
  }

  // Método para validar si la API key es válida
  async testConnection() {
    try {
      const response = await fetch(
        `${this.baseURL}/models?key=${this.apiKey}`
      );
      return response.ok;
    } catch (error) {
      console.error('Error testando conexión:', error);
      return false;
    }
  }
}

export default GeminiClient;