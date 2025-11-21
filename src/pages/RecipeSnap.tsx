import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, Camera, Coins, ArrowLeft, Sparkles, Upload, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CoinDisplay from "@/components/CoinDisplay";
import UploadZone from "@/components/UploadZone";
import RecipeResult from "@/components/RecipeResult";
import { useToast } from "@/hooks/use-toast";
import GeminiClient from "../lib/gemini-client";

const RecipeSnap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coins, setCoins] = useState(50); // Demo coins
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
      toast({
        title: "¡Imagen cargada!",
        description: "Ahora genera tu receta con IA",
      });
    };
    reader.readAsDataURL(file);
  };

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
      const imageBase64 = uploadedImage?.replace(/^data:image\/[a-z]+;base64,/, "");
      
      if (!imageBase64) {
        throw new Error('No hay imagen cargada');
      }

      // Configurar preferencias del usuario
      const userPreferences = {
        difficulty: "intermedia",
        time: "30-45 minutos", 
        servings: "2-4",
        dietary: "ninguna"
      };

      toast({
        title: "Analizando imagen...",
        description: "Gemini IA está procesando tus ingredientes",
      });

      // Llamar al Worker de Cloudflare en lugar de Gemini directamente
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          preferences: userPreferences
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al generar receta');
      }

      const data = await response.json();
      
      if (data.success && data.recipe) {
        setRecipe(data.recipe);
        
        toast({
          title: "¡Receta generada!",
          description: "Tu receta personalizada está lista",
        });
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
      
    } catch (error) {
      console.error('Error generando receta:', error);
      
      // Fallback a receta básica mejorada
      setRecipe({
        name: "Plato Preparado",
        difficulty: "Intermedia",
        time: "25 min",
        servings: 2,
        ingredients: [
          "Ingredientes de la imagen preparados - 300g",
          "Sal al gusto",
          "Aceite de oliva - 2 cucharadas",
          "Especias frescas disponibles"
        ],
        steps: [
          "Examina cuidadosamente los ingredientes visibles en tu imagen",
          "Lava y corta los ingredientes apropiadamente",
          "Calienta aceite en una sartén a fuego medio",
          "Cocina los ingredientes principales por 15-20 minutos",
          "Sazona con sal y especias al gusto",
          "Sirve caliente y disfruta tu preparación"
        ],
        nutrition: { calories: 320, protein: 14, carbs: 38, fat: 16 },
        tips: [
          "Observa detalladamente cada ingrediente en tu imagen",
          "Ajusta el tiempo de cocción según el tipo de ingredientes",
          "Experimenta con diferentes combinaciones de especias"
        ],
        estimated_cost: "medio",
        description: "Receta personalizada basada en los ingredientes de tu imagen",
        detected_ingredients: ["Ingredientes visibles en la fotografía"],
        image_analysis: "Análisis automático de la imagen cargada"
      });
      
      toast({
        title: "Receta básica generada",
        description: "Revisa los ingredientes visibles para crear tu plato",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWatchAd = () => {
    toast({
      title: "Viendo anuncio...",
      description: "Ganarás 10 monedas al finalizar",
    });
    
    setTimeout(() => {
      setCoins((prev) => prev + 10);
      toast({
        title: "¡Monedas ganadas!",
        description: "+10 monedas agregadas a tu cuenta",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">RecipeSnap</h1>
                  <p className="text-xs text-muted-foreground">Recetas IA en segundos</p>
                </div>
              </div>
            </div>
            <CoinDisplay coins={coins} onWatchAd={handleWatchAd} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-6 pb-24">
        {!recipe ? (
          <div className="space-y-6">
            {/* Hero Section - Mobile Optimized */}
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Recetas IA en segundos</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                ¿Qué cocinar hoy?
              </h1>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Toma foto a tus ingredientes y obtén recetas personalizadas al instante
              </p>
            </div>

            {/* Upload Section - Mobile First */}
            <Card className="p-6 bg-gradient-card border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Toma una foto</h2>
                  <p className="text-sm text-muted-foreground">
                    De tus ingredientes o sube desde galería
                  </p>
                </div>
              </div>
              <UploadZone onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />

              <Button
                size="lg"
                className="w-full mt-6 shadow-lg h-14 text-lg font-semibold"
                disabled={!uploadedImage || isGenerating}
                onClick={handleGenerateRecipe}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Generando Receta...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Generar Receta (-10 monedas)
                  </>
                )}
              </Button>
            </Card>

            {/* How it Works - Simplified for Mobile */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                ¿Cómo funciona?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Sube una foto",
                    desc: "De tus ingredientes",
                  },
                  {
                    step: "2",
                    title: "IA genera receta",
                    desc: "Personalizada para ti",
                  },
                  {
                    step: "3",
                    title: "Cocina y disfruta",
                    desc: "Con instrucciones paso a paso",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <RecipeResult
            recipe={recipe}
            coins={coins}
            onBack={() => {
              setRecipe(null);
              setUploadedImage(null);
            }}
            onWatchAd={handleWatchAd}
          />
        )}
      </main>

      {/* Fixed Bottom CTA for Mobile */}
      {!recipe && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 safe-area-pb">
          <div className="container mx-auto max-w-6xl px-6">
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-lg"
              disabled={!uploadedImage || isGenerating}
              onClick={handleGenerateRecipe}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Crear Receta (-10)
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSnap;
