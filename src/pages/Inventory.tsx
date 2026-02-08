import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Fuel, Gauge, Calendar, ChevronDown, ChevronUp, Search, AlertCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getListings } from "@/services/api";
import type { Listing } from "@/types";
import { getAttribute } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import placeholderImg from "@/assets/car-sedan.jpg";

// Hardcoded categories as there's no public endpoint for them yet.
const categories = ["Toate", "SUV", "Sedan", "Sport", "Break", "Hatchback"];

const CarCard = ({ car }: { car: Listing }) => {
  const navigate = useNavigate();

  const carImage = car.images?.[0]?.url || placeholderImg;
  const year = getAttribute(car, 'an');
  const fuel = getAttribute(car, 'combustibil');
  const power = getAttribute(car, 'putere (cp)') || getAttribute(car, 'putere');

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

const CarCardSkeleton = () => (
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
)

const Inventory = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialCategory = searchParams.get("category") || "Toate";
  const [filter, setFilter] = useState(initialCategory);
  const [search, setSearch] = useState("");

  const { data: cars, isLoading, isError } = useQuery({
    queryKey: ['listings', { q: search }],
    queryFn: () => getListings({ q: search }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const filtered = cars?.filter((c) => {
    const matchCat = filter === "Toate" || c.category.name.toLowerCase() === filter.toLowerCase();
    return matchCat;
  }) || [];

  return (
    <div className="section-padding pb-24">
      <SectionTitle title="Mașini în Stoc" subtitle="Descoperă oferta noastră curentă" gold />

      <div className="mb-4 flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3">
        <Search size={18} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Caută marca sau modelul..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
        />
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
              filter === cat ? "btn-gold" : "btn-outline-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {isLoading && Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)}
          {isError && (
              <div className="col-span-full mt-12 text-center text-muted-foreground flex flex-col items-center gap-2">
                <AlertCircle className="w-8 h-8 text-destructive" />
                <p>A apărut o eroare la încărcarea mașinilor.</p>
                <p className="text-xs">Vă rugăm să reîncercați mai târziu.</p>
              </div>
          )}
          {!isLoading && !isError && filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </AnimatePresence>
      </motion.div>

      {!isLoading && !isError && filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          Nu am găsit nicio mașină. Încearcă alte filtre.
        </p>
      )}
    </div>
  );
};

export default Inventory;
