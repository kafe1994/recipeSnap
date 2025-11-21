import { Button } from "@/components/ui/button";
import { Coins, Play } from "lucide-react";

interface CoinDisplayProps {
  coins: number;
  onWatchAd: () => void;
}

const CoinDisplay = ({ coins, onWatchAd }: CoinDisplayProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-gradient-to-r from-coin-gold to-coin-shine px-4 py-2 rounded-full shadow-soft">
        <Coins className="w-5 h-5 text-yellow-900" />
        <span className="font-bold text-yellow-900">{coins}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onWatchAd}
        className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
      >
        <Play className="w-4 h-4 mr-1" />
        Ver Anuncio
      </Button>
    </div>
  );
};

export default CoinDisplay;
