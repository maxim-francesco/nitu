import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Gauge, Fuel, Cog, ArrowRight, PlayCircle } from "lucide-react";
import type { Listing } from "@/types";
import { getAttribute } from "@/types";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { Skeleton } from "@/components/ui/skeleton";
import placeholderImg from "@/assets/car-sedan.jpg";

const SpecItem = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string | number | boolean | null, label: string }) => {
    if (!value && value !== 0) return null;
    return (
        <div className="flex items-center gap-3 bg-muted/40 hover:bg-muted/60 transition-colors p-3 rounded-xl border border-border/20 shadow-sm">
            <Icon size={18} className="gold-icon shrink-0" />
            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">{label}</p>
                <p className="font-bold text-foreground text-sm truncate mt-0.5">{String(value)}</p>
            </div>
        </div>
    )
}

export const CarCard = ({ car, priority = false }: { car: Listing, priority?: boolean }) => {
  const navigate = useNavigate();

  const carImage = car.images?.[0]?.url 
    ? getOptimizedImageUrl(car.images[0].url, 640, 426) // optimized for 3:2 aspect ratio
    : placeholderImg;
  const year = getAttribute(car, 'an');
  const fuel = getAttribute(car, 'combustibil');
  const transmission = getAttribute(car, 'cutie de viteze');

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card-gold flex flex-col overflow-hidden group hover:border-primary/60 transition-all duration-300 hover:shadow-gold-lg"
    >
      <div 
        className="flex h-full w-full flex-col cursor-pointer"
        onClick={() => navigate(`/masini/${car.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate(`/masini/${car.id}`);
          }
        }}
      >
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        {/* TODO: Convertește car-sedan.jpg în WebP (car-sedan.webp) și încarcă-l în public/ pentru imagini fallback mai rapide */}
        <picture>
          {/* <source srcSet="/car-sedan.webp" type="image/webp" /> */}
          <img 
            src={carImage} 
            alt={car.title} 
            width={640}
            height={426}
            loading={priority ? "eager" : "lazy"}
            fetchpriority={priority ? "high" : "auto"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </picture>
        {car.youtubeVideoId && (
          <div className="absolute top-3 right-3 bg-red-600/90 text-white flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse z-10">
            <PlayCircle size={14} className="fill-white/20" />
            VIDEO
          </div>
        )}
        <div className="absolute top-3 left-3 bg-card/95 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
          {car.category.name}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-extrabold text-lg text-foreground line-clamp-1 flex-1 tracking-tight" title={car.title}>
            {car.title}
          </h3>
          {car.price && (
            <span className="font-extrabold text-xl gold-gradient-text shrink-0 pl-1">
              {car.price.toLocaleString("ro-RO")} €
            </span>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
            <SpecItem icon={Calendar} value={year} label="An" />
            <SpecItem icon={Gauge} value={car.mileage ? `${car.mileage.toLocaleString("ro-RO")} km` : null} label="Kilometraj" />
            <SpecItem icon={Fuel} value={fuel} label="Combustibil" />
            <SpecItem icon={Cog} value={transmission} label="Transmisie" />
        </div>

        <div className="mt-auto pt-5">
             <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                Detalii complete
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
        </div>
      </div>
      </div>
    </motion.article>
  );
};

export const CarCardSkeleton = () => (
    <div className="glass-card-gold flex flex-col overflow-hidden">
        <Skeleton className="aspect-[3/2] w-full" />
        <div className="flex flex-1 flex-col p-5">
            <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-1/4 ml-2" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className="flex items-center gap-3 bg-muted/40 p-3 rounded-xl border border-border/20">
                        <Skeleton className="size-5 rounded-md"/>
                        <div className="space-y-1.5 flex-1">
                            <Skeleton className="h-2.5 w-1/2"/>
                            <Skeleton className="h-3.5 w-3/4"/>
                        </div>
                     </div>
                ))}
            </div>
            <div className="mt-auto pt-5">
                <Skeleton className="h-5 w-1/2 mx-auto" />
            </div>
        </div>
    </div>
);