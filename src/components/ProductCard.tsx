
import { useState } from "react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusIcon, ShoppingCartIcon, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(product.price);

  return (
    <div 
      className="group bg-white border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "opacity-100" : "opacity-0",
            isHovered ? "scale-105" : "scale-100"
          )}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Enhanced hover overlay with gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Button
            onClick={handleAddToCart}
            variant="secondary"
            size="sm"
            className="rounded-full bg-white/90 hover:bg-white shadow-lg mb-4 transition-all duration-300 hover:scale-105"
            aria-label={`Quick add ${product.name} to cart`}
          >
            <ShoppingCartIcon className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {product.category && (
          <span className="inline-block text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full mb-2">
            {product.category}
          </span>
        )}
        
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-lg gradient-text">{formattedPrice}</span>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  variant="outline"
                  className="rounded-full w-10 h-10 p-0 hover:bg-primary hover:text-white transition-colors duration-300"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
