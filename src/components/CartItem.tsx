
import { useState } from "react";
import { CartItem as CartItemType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { product, quantity } = item;

  const handleIncrement = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    } else {
      onRemove(product.id);
    }
  };

  const handleRemove = () => {
    onRemove(product.id);
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(product.price);

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(product.price * quantity);

  return (
    <div 
      className="flex items-center gap-4 p-4 border border-border rounded-lg bg-white/50 mb-3 transition-all duration-300 hover:shadow-md animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "h-full w-full object-cover transition-all duration-300",
            imageLoaded ? "opacity-100" : "opacity-0",
            isHovered ? "scale-105" : "scale-100"
          )}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{formattedPrice} each</p>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-full overflow-hidden shadow-sm">
            <button
              onClick={handleDecrement}
              className="p-1.5 hover:bg-muted transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            
            <span className="px-3 text-sm font-medium">{quantity}</span>
            
            <button
              onClick={handleIncrement}
              className="p-1.5 hover:bg-muted transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleRemove}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-full hover:bg-muted"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove from cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="text-right">
        <span className="font-semibold gradient-text text-lg">{formattedTotal}</span>
      </div>
    </div>
  );
};

export default CartItem;
