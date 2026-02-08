import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Gauge, ChevronDown } from "lucide-react";
import type { Listing } from "@/types";
import { getAttribute } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import placeholderImg from "@/assets/car-sedan.jpg";

export const CarCard = ({ car }: { car: Listing }) => {
  const navigate = useNavigate();

  const carImage = car.images?.[0]?.url || placeholderImg;
  const year = getAttribute(car, 'an');

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
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          {year && <span className="flex items-center gap-1"><Calendar size={13} className="gold-icon" /> {year}</span>}
          {car.mileage && <span className="flex items-center gap-1"><Gauge size={13} className="gold-icon" /> {car.mileage.toLocaleString("ro-RO")} km</span>}
        </div>
        <div className="mt-auto pt-3">
             <div className="mt-3 flex items-center justify-center gap-1 text-xs text-primary transition-transform active:scale-95">
                Detalii
                <ChevronDown size={14} className="transform transition-transform group-hover:translate-y-0.5" />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CarCardSkeleton = () => (
    <div className="glass-card-gold overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <div className="p-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-1/4 mt-1" />
            <div className="mt-3 flex gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    </div>
);
