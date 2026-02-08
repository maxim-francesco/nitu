
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, AlertCircle, Car } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getListings } from "@/services/api";
import { CarCard, CarCardSkeleton } from "@/components/CarCard";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Filters } from "@/types";

const Inventory = () => {
  // UI state for direct feedback
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [transmission, setTransmission] = useState<string>("Toate");

  // Debounced state for API calls
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState(priceRange);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Debounce slider input for API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500); // Debounce for 500ms to avoid excessive API calls
    return () => clearTimeout(handler);
  }, [priceRange]);

  // Construct filters object for the API call
  const queryFilters: Filters = {
    q: debouncedSearch,
  };
  if (debouncedPriceRange[0] > 0) {
    queryFilters['Pret_min'] = String(debouncedPriceRange[0]);
  }
  if (debouncedPriceRange[1] < 100000) {
    queryFilters['Pret_max'] = String(debouncedPriceRange[1]);
  }
  if (transmission !== "Toate") {
    queryFilters["Cutie de viteze"] = transmission;
  }

  console.log("Sending filters:", queryFilters); // For debugging

  // Fetch data using React Query. It will re-fetch whenever queryFilters changes.
  const { data: cars, isLoading, isError } = useQuery({
    queryKey: ['listings', queryFilters],
    queryFn: () => getListings(queryFilters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div className="section-padding pb-24">
      <SectionTitle title="Mașini în Stoc" subtitle="Descoperă oferta noastră curentă" gold />

      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Caută marca sau modelul..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full bg-muted/50 py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Price Filter */}
          <div className="glass-card rounded-xl p-4">
            <Label className="mb-2 block text-sm font-medium text-muted-foreground">Preț</Label>
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              min={0}
              max={100000}
              step={1000}
              className="accent-primary"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{priceRange[0].toLocaleString("ro-RO")} €</span>
              <span>{priceRange[1].toLocaleString("ro-RO")} €</span>
            </div>
          </div>
          
          {/* Transmission Filter */}
          <div className="glass-card rounded-xl p-4">
            <Label className="mb-2 block text-sm font-medium text-muted-foreground">Cutie de viteze</Label>
            <Select value={transmission} onValueChange={setTransmission}>
              <SelectTrigger className="w-full border-border/50 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Toate">Toate</SelectItem>
                <SelectItem value="Automata">Automată</SelectItem>
                <SelectItem value="Manuala">Manuală</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {isLoading && Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)}
          
          {isError && (
              <div className="col-span-full mt-12 flex flex-col items-center gap-2 text-center text-muted-foreground">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <p>A apărut o eroare la încărcarea mașinilor.</p>
                <p className="text-xs">Vă rugăm să reîncercați mai târziu.</p>
              </div>
          )}

          {!isLoading && !isError && cars && cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </AnimatePresence>
      </motion.div>

      {!isLoading && !isError && cars?.length === 0 && (
        <div className="col-span-full mt-12 flex flex-col items-center gap-3 text-center text-muted-foreground">
          <Car className="h-10 w-10" />
          <p>Nu am găsit nicio mașină care să corespundă filtrelor.</p>
          <p className="text-xs">Încearcă să ajustezi căutarea.</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;
