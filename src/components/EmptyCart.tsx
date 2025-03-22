
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 animate-float">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Looks like you haven't added any products to your cart yet. 
        Explore our collection to find eco-friendly products you'll love.
      </p>
      
      <Button asChild size="lg" className="rounded-full group">
        <Link to="/">
          <span>Start Shopping</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
