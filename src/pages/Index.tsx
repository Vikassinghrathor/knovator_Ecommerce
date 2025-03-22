
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import { ShoppingBag } from "lucide-react";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await getProducts();
      
      if (response.error) {
        setError(response.error);
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error,
        });
      } else if (response.data) {
        setProducts(response.data);
      }
      
      setLoading(false);
    };

    fetchProducts();
  }, [toast]);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data:", e);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems, product];
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(newItems));
      return newItems;
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar cartItemsCount={cartItems.length} />
      
      {/* Hero section with carousel */}
      <section className="pt-32 pb-8 md:pt-36 md:pb-12">
        <div className="container">
          <HeroCarousel />
        </div>
      </section>
      
      {/* Categories section */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {["All", "Electronics", "Furniture", "Kitchen", "Lifestyle", "Home Decor"].map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  category === "All" 
                    ? "bg-primary text-white" 
                    : "bg-white hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
            <span className="text-sm font-medium text-primary">Our Collection</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Our collection of sustainable and eco-friendly products
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-muted rounded-lg overflow-hidden">
                  <div className="aspect-square w-full bg-muted"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-full"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-4/5"></div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-5 bg-muted-foreground/20 rounded w-1/4"></div>
                      <div className="h-8 w-8 bg-muted-foreground/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">Failed to load products</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className="opacity-0 animate-slide-in"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "forwards"
                  }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Featured collection banner */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container">
          <div className="rounded-2xl overflow-hidden relative">
            <div 
              className="relative p-12 md:p-16 min-h-[300px] flex items-center"
              style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1200&q=80)",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
              <div className="max-w-lg relative z-10 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Sustainable Living Collection</h2>
                <p className="mb-6">Discover our range of environmentally conscious products designed for modern living.</p>
                <button className="bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
