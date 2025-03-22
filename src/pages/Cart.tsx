
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CartItem as CartItemType, Product, UserDetails } from "@/lib/types";
import { placeOrder } from "@/lib/api";
import CartItem from "@/components/CartItem";
import CheckoutForm from "@/components/CheckoutForm";
import EmptyState from "@/components/EmptyState";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Check, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as Product[];
        
        // Convert simple product array to CartItem array with quantities
        const itemsWithQuantity: CartItemType[] = [];
        parsedCart.forEach(product => {
          const existingItem = itemsWithQuantity.find(item => item.product.id === product.id);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            itemsWithQuantity.push({
              product,
              quantity: 1
            });
          }
        });
        
        setCartItems(itemsWithQuantity);
      } catch (e) {
        console.error("Error parsing cart data:", e);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    setCartItems(prev => {
      const updated = prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      
      updateLocalStorage(updated);
      return updated;
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.product.id !== productId);
      updateLocalStorage(updated);
      return updated;
    });
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart."
    });
  };

  const updateLocalStorage = (items: CartItemType[]) => {
    // Convert CartItems back to raw products with duplicates for quantity
    const productsArray: Product[] = [];
    
    items.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        productsArray.push(item.product);
      }
    });
    
    localStorage.setItem("cart", JSON.stringify(productsArray));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleCheckout = async (userDetails: UserDetails) => {
    setIsSubmitting(true);
    
    const total = calculateTotal();
    
    const response = await placeOrder({
      items: cartItems,
      userDetails,
      total
    });
    
    setIsSubmitting(false);
    
    if (response.error) {
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: response.error
      });
    } else if (response.data) {
      setOrderSuccess(true);
      setOrderId(response.data.orderId || null);
      
      // Clear cart
      localStorage.removeItem("cart");
      setCartItems([]);
      
      toast({
        title: "Order placed successfully",
        description: `Your order ${response.data.orderId} has been placed!`,
      });
    }
  };

  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = calculateTotal();

  // Format price
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(cartTotal);

  return (
    <div className="min-h-screen">
      <Navbar cartItemsCount={totalItems} />
      
      <div className="container pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to products</span>
            </Link>
            
            <h1 className="text-3xl font-medium mt-4 mb-6">Your Cart</h1>
            
            {cartItems.length === 0 && !orderSuccess ? (
              <EmptyState
                icon={<ShoppingCart className="w-6 h-6" />}
                title="Your cart is empty"
                description="Once you add items to your cart, they will appear here."
                action={{
                  label: "Browse Products",
                  href: "/"
                }}
              />
            ) : orderSuccess ? (
              <div className="bg-white border border-border rounded-lg p-8 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-medium mb-2">Order Successful!</h2>
                  {orderId && (
                    <p className="text-muted-foreground">
                      Your order number is <span className="font-medium text-foreground">{orderId}</span>
                    </p>
                  )}
                </div>
                
                <Link 
                  to="/" 
                  className="inline-flex justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <div className="bg-white border border-border rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-lg font-medium mb-4">Cart Items ({totalItems})</h2>
                      
                      <div>
                        {cartItems.map(item => (
                          <CartItem
                            key={item.product.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="bg-white border border-border rounded-lg overflow-hidden sticky top-24">
                    <div className="p-6">
                      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>{formattedTotal}</span>
                        </div>
                        
                        <div className="flex justify-between text-muted-foreground">
                          <span>Shipping</span>
                          <span>Free</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between font-medium text-lg">
                          <span>Total</span>
                          <span>{formattedTotal}</span>
                        </div>
                      </div>
                      
                      <CheckoutForm 
                        onSubmit={handleCheckout}
                        isSubmitting={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
