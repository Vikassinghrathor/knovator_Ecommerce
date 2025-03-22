
import { useState, useEffect, useCallback } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Eco-Friendly Collection",
    description: "Discover our sustainable products made with environmentally conscious materials.",
    buttonText: "Shop Now",
    buttonLink: "/",
    textColor: "text-white",
    bgImage: "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?auto=format&fit=crop&w=1200&q=80",
    overlayColor: "from-emerald-900/70 to-emerald-700/30"
  },
  {
    id: 2,
    title: "Modern Essentials",
    description: "Minimalist designs for contemporary living spaces.",
    buttonText: "Explore",
    buttonLink: "/",
    textColor: "text-white",
    bgImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    overlayColor: "from-blue-900/80 to-blue-800/60"
  },
  {
    id: 3,
    title: "Summer Sale",
    description: "Limited time discount on selected items. Up to 40% off.",
    buttonText: "View Offers",
    buttonLink: "/",
    textColor: "text-white",
    bgImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    overlayColor: "from-amber-700/70 to-rose-700/50"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Update current slide when API changes slides
  useEffect(() => {
    if (!api) return;
    
    const handleSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", handleSelect);
    
    // Get initial slide
    setCurrentSlide(api.selectedScrollSnap());
    
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Handle autoplay
  useEffect(() => {
    if (!autoplayEnabled || !api) return;
    
    const interval = setInterval(() => {
      if (!isAnimating) {
        api.scrollNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAnimating, autoplayEnabled, api]);

  const handleSelect = useCallback((index: number) => {
    if (currentSlide !== index && !isAnimating && api) {
      setIsAnimating(true);
      api.scrollTo(index);
      setTimeout(() => setIsAnimating(false), 700); // Match transition duration
    }
  }, [currentSlide, isAnimating, api]);

  const getIndicatorColor = (index: number) => {
    if (currentSlide !== index) return "bg-white/30";
    
    switch (index) {
      case 0: return "bg-emerald-500";
      case 1: return "bg-blue-500";
      case 2: return "bg-amber-500";
      default: return "bg-white";
    }
  };

  const getButtonVariant = (index: number) => {
    switch (index) {
      case 0: return "default";
      case 1: return "secondary";
      case 2: return "outline";
      default: return "default";
    }
  };

  return (
    <div className="w-full relative overflow-hidden rounded-2xl">
      <Carousel 
        className="w-full" 
        onMouseEnter={() => setAutoplayEnabled(false)}
        onMouseLeave={() => setAutoplayEnabled(true)}
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
          skipSnaps: false,
          dragFree: false,
          duration: 800, // Slower, smoother transition
          inViewThreshold: 0.8
        }}
      >
        <CarouselContent className="h-[450px] md:h-[550px]">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="overflow-hidden">
              <div 
                className="relative h-full w-full overflow-hidden rounded-xl"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Enhanced gradient overlay with subtle animation */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor} z-0 transition-opacity duration-1000`}
                  style={{ opacity: currentSlide === index ? 0.85 : 0.6 }}
                ></div>
                
                <div className="flex flex-col justify-center h-full relative z-10 px-8 md:px-12 lg:px-16 max-w-2xl mx-auto md:mx-8 lg:mx-16">
                  <span 
                    className="inline-block text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4 text-white w-fit"
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(-20px)',
                      transition: 'opacity 0.8s ease, transform 0.8s ease',
                    }}
                  >
                    Featured
                  </span>
                  
                  <h2 
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${slide.textColor} tracking-tight`}
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
                    }}
                  >
                    {slide.title}
                  </h2>
                  
                  <p 
                    className={`text-lg mb-8 ${slide.textColor} max-w-md`}
                    style={{
                      opacity: currentSlide === index ? 0.95 : 0,
                      transform: currentSlide === index ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
                    }}
                  >
                    {slide.description}
                  </p>
                  
                  <Button 
                    asChild 
                    className={cn(
                      "group rounded-full w-fit transition-all duration-800",
                      "shadow-lg hover:shadow-xl"
                    )}
                    style={{
                      opacity: currentSlide === index ? 1 : 0,
                      transform: currentSlide === index ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                      transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
                    }}
                    variant={getButtonVariant(index)}
                    size="lg"
                  >
                    <Link to={slide.buttonLink}>
                      {slide.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                
                {/* Enhanced decorative elements */}
                <div 
                  className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"
                  style={{
                    opacity: currentSlide === index ? 0.8 : 0,
                    transition: 'opacity 1s ease',
                  }}
                />
                <div 
                  className="absolute top-1/4 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"
                  style={{
                    opacity: currentSlide === index ? 0.8 : 0,
                    transition: 'opacity 1s ease',
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom navigation buttons with improved hover effects */}
        <div className="absolute top-1/2 left-4 md:left-6 -translate-y-1/2 z-10">
          <CarouselPrevious 
            className="bg-black/20 hover:bg-black/40 border-none text-white backdrop-blur-sm h-10 w-10 shadow-lg transition-all duration-300 hover:scale-110"
            icon={<ChevronLeft className="h-5 w-5" />}
          />
        </div>
        <div className="absolute top-1/2 right-4 md:right-6 -translate-y-1/2 z-10">
          <CarouselNext 
            className="bg-black/20 hover:bg-black/40 border-none text-white backdrop-blur-sm h-10 w-10 shadow-lg transition-all duration-300 hover:scale-110" 
            icon={<ChevronRight className="h-5 w-5" />}
          />
        </div>
        
        {/* Enhanced indicators with animation */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="flex justify-center items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "transition-all duration-500 rounded-full",
                  currentSlide === index ? "w-10 h-2" : "w-2 h-2 hover:bg-white/60",
                  getIndicatorColor(index)
                )}
                onClick={() => handleSelect(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
