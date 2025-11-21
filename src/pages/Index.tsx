import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, Calculator, Heart, ArrowRight, Coins, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const apps = [
    {
      id: "recipesnap",
      icon: ChefHat,
      title: "RecipeSnap",
      tagline: "De foto a receta en segundos",
      description: "Saca foto a tus ingredientes y obtén recetas instantáneas con IA. Miles de recetas premium desbloqueables.",
      color: "primary",
      viralScore: 9.5,
      features: ["IA Visual", "Recetas Personalizadas", "Análisis Nutricional"],
    },
    {
      id: "quicksplit",
      icon: Calculator,
      title: "QuickSplit",
      tagline: "Divide gastos sin drama",
      description: "Escanea el ticket, la IA divide automáticamente. Perfecto para grupos y viajes.",
      color: "secondary",
      viralScore: 8.7,
      features: ["OCR Instantáneo", "División Inteligente", "Múltiples Monedas"],
    },
    {
      id: "moodcalendar",
      icon: Heart,
      title: "MoodCalendar",
      tagline: "Tu bienestar emocional",
      description: "Tracking emocional con insights predictivos. Descubre patrones y mejora tu bienestar.",
      color: "accent",
      viralScore: 8.3,
      features: ["Insights IA", "Patrones Emocionales", "Meditaciones Guiadas"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Apps Virales • Monetización Inteligente</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              3 Ideas que Revolucionarán
              <br />
              <span className="text-accent">Tu Emprendimiento Digital</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Aplicaciones diseñadas para volverse virales, monetizadas con un sistema de monedas
              que mantiene a los usuarios enganchados y felices.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Coins, label: "Sistema de Monedas", value: "Ver anuncios = Desbloquear premium" },
              { icon: Users, label: "Efecto Viral", value: "Comparte y gana más monedas" },
              { icon: Zap, label: "ROI Probado", value: "Monetización desde día 1" },
            ].map((stat, idx) => (
              <Card
                key={idx}
                className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                <p className="text-white/70 text-sm mb-1">{stat.label}</p>
                <p className="text-white font-semibold">{stat.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Elige Tu Próxima App Exitosa
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada app está diseñada con métricas virales comprobadas y un modelo de negocio sostenible.
              Haz clic en cualquiera para explorar el demo completo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {apps.map((app, idx) => {
              const Icon = app.icon;
              return (
                <Card
                  key={app.id}
                  className="group relative overflow-hidden hover:shadow-glow transition-all duration-500 cursor-pointer border-2 hover:border-primary"
                  onClick={() => app.id === "recipesnap" && navigate("/recipe-snap")}
                >
                  {/* Viral Score Badge */}
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold z-10">
                    Score Viral: {app.viralScore}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-${app.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-8 h-8 text-${app.color}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-2">{app.title}</h3>
                    <p className="text-primary font-medium mb-3">{app.tagline}</p>
                    <p className="text-muted-foreground mb-6 min-h-[60px]">{app.description}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {app.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      variant={app.id === "recipesnap" ? "default" : "outline"}
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      disabled={app.id !== "recipesnap"}
                    >
                      {app.id === "recipesnap" ? (
                        <>
                          Explorar Demo <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      ) : (
                        "Próximamente"
                      )}
                    </Button>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                </Card>
              );
            })}
          </div>

          {/* Why RecipeSnap Won */}
          <Card className="mt-16 bg-gradient-card border-2 border-primary/20 p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <ChefHat className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  ¿Por qué RecipeSnap es la mejor opción?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-2">✅ Mayor Potencial Viral</p>
                    <p className="text-sm">La comida es el contenido más compartido en redes sociales. Cada receta generada es una oportunidad de viralización.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">✅ Problema Diario Real</p>
                    <p className="text-sm">"¿Qué cocino hoy?" es una pregunta universal. 3+ consultas diarias por usuario = alto engagement.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">✅ Bajo Costo de Desarrollo</p>
                    <p className="text-sm">Leveraging de Lovable AI para generación de recetas. No requiere hardware especializado ni APIs costosas.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">✅ Monetización Clara</p>
                    <p className="text-sm">Recetas básicas gratis, premium con monedas. Análisis nutricional, lista de compras, y modo chef son upsells naturales.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Listo para Crear Tu App Viral?
          </h2>
          <p className="text-muted-foreground mb-8">
            RecipeSnap está completamente funcional. Explora el demo y descubre cómo el sistema de
            monedas crea engagement masivo.
          </p>
          <Button size="lg" onClick={() => navigate("/recipe-snap")} className="shadow-glow">
            Explorar RecipeSnap <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
