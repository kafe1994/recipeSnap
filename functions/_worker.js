/**
 * Cloudflare Worker para RecipeSnap
 * Maneja la integracion con Google Gemini AI y las requests de la aplicacion
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers para permitir requests desde el frontend
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Ruta para generar recetas con IA
    if (url.pathname === '/api/generate-recipe' && request.method === 'POST') {
      try {
        const { imageBase64, preferences } = await request.json();
        
        // Verificar que tenemos la API key configurada
        const geminiApiKey = env.GEMINI_API_KEY;
        if (!geminiApiKey) {
          return new Response(JSON.stringify({ 
            error: 'API key no configurada' 
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Preparar prompt mejorado para reconocimiento exacto
        const prompt = `Eres un chef experto especializado en identificar ingredientes y crear recetas detalladas.

IMPORTANTE: Analiza MUY CUIDADOSAMENTE la imagen proporcionada e identifica SOLO los ingredientes que estan REALMENTE visibles y claros en la fotografia.

Preferencias del usuario:
- Dificultad: ${preferences?.difficulty || 'intermedia'}
- Tiempo: ${preferences?.time || '30-45 minutos'}
- Porciones: ${preferences?.servings || '2-4 personas'}
- Restricciones: ${preferences?.dietary || 'ninguna'}

INSTRUCCIONES CRITICAS:
1. Describe DETALLADAMENTE cada ingrediente que ves en la imagen
2. NO inventes ingredientes que no estan visibles
3. Si hay comida ya cocinada en la imagen, describe QUE PLATO ES especificamente
4. Si no puedes identificar claramente algun ingrediente, mencionalo como "ingrediente no identificado"
5. Se muy especifico con colores, texturas, formas y cantidad aparente de cada ingrediente

Responde EXCLUSIVAMENTE con un objeto JSON valido con esta estructura:

{
  "name": "Nombre descriptivo de la receta",
  "difficulty": "Facil" | "Intermedia" | "Dificil",
  "time": "X min",
  "servings": 4,
  "ingredients": [
    "ingrediente principal con cantidad estimada",
    "ingrediente secundario con cantidad estimada"
  ],
  "steps": [
    "paso detallado 1 basado en ingredientes reales",
    "paso detallado 2 basado en ingredientes reales",
    "paso detallado 3 basado en ingredientes reales"
  ],
  "nutrition": {
    "calories": 350,
    "protein": 15,
    "carbs": 45,
    "fat": 12
  },
  "tips": [
    "consejo util especifico para esta receta"
  ],
  "estimated_cost": "bajo" | "medio" | "alto",
  "description": "Descripcion breve de la receta",
  "detected_ingredients": [
    "lista detallada de ingredientes identificados en la imagen",
    "con descripciones de como se ven exactamente"
  ],
  "image_analysis": "Descripcion detallada de lo que se ve en la imagen"
}

IMPORTANTE: 
- Responde solo con JSON valido, sin texto adicional
- Usa el formato de temperatura y cantidades correcto
- Se muy preciso con las cantidades estimadas`;

        // Llamada a Gemini AI
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
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
                temperature: 0.1,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              }
            })
          }
        );

        const geminiData = await geminiResponse.json();
        
        if (!geminiResponse.ok) {
          console.error('Error de Gemini:', geminiData);
          return new Response(JSON.stringify({ 
            error: 'Error en el servicio de IA',
            details: geminiData
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        if (geminiData.candidates && geminiData.candidates[0] && geminiData.candidates[0].content) {
          const recipeText = geminiData.candidates[0].content.parts[0].text;
          console.log('Gemini Response:', recipeText);
          
          // Parse del JSON
          let recipeData;
          try {
            const cleanedText = recipeText.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
            const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              recipeData = JSON.parse(jsonMatch[0]);
            } else {
              recipeData = JSON.parse(cleanedText);
            }
          } catch (parseError) {
            console.error('Error parseando JSON:', parseError);
            return new Response(JSON.stringify({ 
              error: 'Error procesando respuesta de IA' 
            }), {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }

          return new Response(JSON.stringify({ 
            success: true, 
            recipe: recipeData 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } else {
          throw new Error('No se pudo generar la receta');
        }

      } catch (error) {
        console.error('Error en Worker:', error);
        return new Response(JSON.stringify({ 
          error: 'Error interno del servidor' 
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Ruta para verificar estado del servicio
    if (url.pathname === '/api/health' && request.method === 'GET') {
      const hasApiKey = !!env.GEMINI_API_KEY;
      return new Response(JSON.stringify({ 
        status: 'ok', 
        gemini_configured: hasApiKey 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Para todas las otras requests, delegamos a Pages
    return fetch(request);
  }
};