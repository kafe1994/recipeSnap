import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Clock,
  Users,
  Flame,
  Lock,
  Share2,
  Heart,
  Download,
  ChefHat,
} from "lucide-react";

interface RecipeResultProps {
  recipe: any;
  coins: number;
  onBack: () => void;
  onWatchAd: () => void;
}

const RecipeResult = ({ recipe, coins, onBack, onWatchAd }: RecipeResultProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Back Button */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="outline" size="sm" onClick={onBack} className="touch-manipulation">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Nueva
        </Button>
        <div className="flex-1"></div>
      </div>

      {/* Recipe Header */}
      <Card className="p-6 bg-gradient-card border-2 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
              <ChefHat className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground leading-tight">{recipe.name}</h1>
              <Badge variant="secondary" className="mt-3">
                {recipe.difficulty}
              </Badge>
            </div>
          </div>

          {/* Recipe Meta - Mobile Optimized */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">{recipe.time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-medium">{recipe.servings} porciones</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Flame className="w-5 h-5 text-primary" />
              <span className="font-medium">{recipe.nutrition.calories} kcal</span>
            </div>
          </div>

          {/* Action Buttons - Mobile Optimized */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="sm" className="shadow-soft h-10 touch-manipulation">
              <Heart className="w-4 h-4 mr-2" />
              Guardar (5)
            </Button>
            <Button size="sm" variant="outline" className="h-10 touch-manipulation">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button size="sm" variant="outline" className="h-10 touch-manipulation">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Ingredients */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          📝 Ingredientes
          <Badge variant="outline" className="ml-auto">
            {recipe.ingredients.length} items
          </Badge>
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {recipe.ingredients.map((ingredient: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
              <span className="text-foreground text-sm">{ingredient}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Steps */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">👨‍🍳 Preparación</h2>
        <div className="space-y-4">
          {recipe.steps.map((step: string, idx: number) => (
            <div key={idx} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 mt-1">
                {idx + 1}
              </div>
              <p className="text-foreground pt-1 text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Premium Features */}
      <Card className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 border-primary/20">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Desbloquea Funciones Premium
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              title: "Análisis Nutricional",
              desc: "Desglose completo de macros y micros",
              coins: 20,
            },
            {
              title: "Lista de Compras",
              desc: "Exporta ingredientes a tu app favorita",
              coins: 15,
            },
            {
              title: "Modo Chef",
              desc: "Videos paso a paso y tips profesionales",
              coins: 30,
            },
          ].map((feature, idx) => (
            <Card key={idx} className="p-4 hover:shadow-soft transition-all">
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{feature.desc}</p>
              <Button
                size="sm"
                variant="outline"
                className="w-full h-10 touch-manipulation"
                disabled={coins < feature.coins}
              >
                {coins < feature.coins ? (
                  <>
                    <Lock className="w-3 h-3 mr-2" />
                    {feature.coins} monedas
                  </>
                ) : (
                  <>Desbloquear ({feature.coins} monedas)</>
                )}
              </Button>
            </Card>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            ¿Necesitas más monedas? Mira un anuncio de 30 segundos
          </p>
          <Button onClick={onWatchAd} className="w-full h-12 touch-manipulation">
            Ver Anuncio (+10 monedas)
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecipeResult;
