import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, AlertCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getListings } from "@/services/api";
import { CarCard, CarCardSkeleton } from "@/components/CarCard";

// Hardcoded categories as there's no public endpoint for them yet.
const categories = ["Toate", "SUV", "Sedan", "Sport", "Break", "Hatchback"];

const Inventory = () => {
  const [searchParams] = useSearchParams();
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
