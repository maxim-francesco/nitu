import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Gauge, Fuel, Cog, ArrowRight } from "lucide-react";
import type { Listing } from "@/types";
import { getAttribute } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import placeholderImg from "@/assets/car-sedan.jpg";

const SpecItem = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string | number | boolean | null, label: string }) => {
    if (!value && value !== 0) return null;
    return (
        <div className="flex items-center gap-2">
            <Icon size={14} className="gold-icon shrink-0" />
            <div className="text-xs">
                <p className="text-muted-foreground">{label}</p>
                <p className="font-semibold text-foreground">{String(value)}</p>
            </div>
        </div>
    )
}

export const CarCard = ({ car }: { car: Listing }) => {
  const navigate = useNavigate();

  const carImage = car.images?.[0]?.url || placeholderImg;
  const year = getAttribute(car, 'an');
  const fuel = getAttribute(car, 'combustibil');
  const transmission = getAttribute(car, 'cutie de viteze');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card-gold flex cursor-pointer flex-col overflow-hidden group"
      onClick={() => navigate(`/masini/${car.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={carImage} alt={car.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card p-3">
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
            {car.category.name}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-bold flex-1 pr-2">{car.title}</h3>
          {car.price && (
            <span className="font-bold gold-gradient-text">{car.price.toLocaleString("ro-RO")} €</span>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
            <SpecItem icon={Calendar} value={year} label="An" />
            <SpecItem icon={Gauge} value={car.mileage ? `${car.mileage.toLocaleString("ro-RO")} km` : null} label="Kilometraj" />
            <SpecItem icon={Fuel} value={fuel} label="Combustibil" />
            <SpecItem icon={Cog} value={transmission} label="Transmisie" />
        </div>

        <div className="mt-auto pt-4">
             <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                Detalii complete
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CarCardSkeleton = () => (
    <div className="glass-card-gold flex flex-col overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <div className="flex flex-1 flex-col p-4">
            <div className="flex justify-between">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/4 ml-2" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className="flex items-center gap-2">
                        <Skeleton className="size-4 rounded"/>
                        <div className="space-y-1.5">
                            <Skeleton className="h-2.5 w-10"/>
                            <Skeleton className="h-3.5 w-16"/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-auto pt-4">
                <Skeleton className="h-5 w-3/4 mx-auto" />
            </div>
        </div>
    </div>
);