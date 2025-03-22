
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  cartItemsCount: number;
}

const Navbar = ({ cartItemsCount }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4",
        scrolled 
          ? "bg-white/90 backdrop-blur shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight flex items-center gap-1 focus-ring rounded-md"
        >
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-sm">eco</span>
          <span className="text-foreground">Store</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md"
          >
            Products
          </Link>
          
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md"
          >
            Categories
          </Link>
          
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md"
          >
            About
          </Link>
          
          <Link 
            to="/cart" 
            className="relative p-2 text-foreground rounded-full hover:bg-secondary/30 transition-colors focus-ring"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          <Link 
            to="/cart" 
            className="relative p-2 text-foreground rounded-full hover:bg-secondary/30 transition-colors focus-ring"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                {cartItemsCount}
              </span>
            )}
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg py-4 animate-slide-in">
          <nav className="container flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            
            <Link 
              to="/" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            
            <Link 
              to="/" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
