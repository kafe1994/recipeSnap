import { Home, Heart, User, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const MobileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      icon: Home,
      label: "Inicio",
      path: "/",
      isActive: location.pathname === "/",
    },
    {
      icon: Heart,
      label: "Favoritos",
      path: "/favorites",
      isActive: false,
    },
    {
      icon: Sparkles,
      label: "Recetas",
      path: "/recipe-snap",
      isActive: location.pathname === "/recipe-snap",
    },
    {
      icon: User,
      label: "Perfil",
      path: "/profile",
      isActive: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border safe-area-pb z-40">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all touch-manipulation ${
                item.isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${item.isActive ? "scale-110" : ""} transition-transform`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;