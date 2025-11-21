import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import RecipeSnap from "./pages/RecipeSnap";
import NotFound from "./pages/NotFound";
import MobileNavigation from "./components/MobileNavigation";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Hide navigation on landing page and not found
  const showNavigation = isMobile && !['/', '*'].includes(location.pathname);

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/recipe-snap" element={<RecipeSnap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNavigation && <MobileNavigation />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
