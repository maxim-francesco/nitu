import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, AlertCircle, Car, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { getListings } from "@/services/api";
import { CarCard, CarCardSkeleton } from "@/components/CarCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { getAttribute } from "@/types";
import PageMeta from "@/components/PageMeta";

export const Inventory = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch full stock once with limit=200, filter client-side
  const { data: cars = [], isLoading, isError } = useQuery({
    queryKey: ['listings', 'all_stock'],
    queryFn: () => getListings({ limit: 200 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract query parameters from URL
  const qParam = searchParams.get("q") || "";
  const marcaParam = useMemo(() => searchParams.get("marca") ? searchParams.get("marca")!.split(",").filter(Boolean) : [], [searchParams]);
  const fuelParam = useMemo(() => searchParams.get("combustibil") ? searchParams.get("combustibil")!.split(",").filter(Boolean) : [], [searchParams]);
  const gearboxParam = useMemo(() => searchParams.get("cutie") ? searchParams.get("cutie")!.split(",").filter(Boolean) : [], [searchParams]);
  
  const pretMinParam = searchParams.get("pret_min");
  const pretMaxParam = searchParams.get("pret_max");
  const anMinParam = searchParams.get("an_min");
  const anMaxParam = searchParams.get("an_max");
  const kmMinParam = searchParams.get("km_min");
  const kmMaxParam = searchParams.get("km_max");
  const sortBy = searchParams.get("sort") || "newest";

  // Derive stock bounds & facets dynamically from fetched cars
  const stockMetrics = useMemo(() => {
    let minPrice = Infinity, maxPrice = -Infinity;
    let minYear = Infinity, maxYear = -Infinity;
    let minKm = Infinity, maxKm = -Infinity;

    const makeCounts: Record<string, number> = {};
    const fuelCounts: Record<string, number> = {};
    const gearboxCounts: Record<string, number> = {};

    cars.forEach((car) => {
      if (car.price != null) {
        minPrice = Math.min(minPrice, car.price);
        maxPrice = Math.max(maxPrice, car.price);
      }
      if (car.mileage != null) {
        minKm = Math.min(minKm, car.mileage);
        maxKm = Math.max(maxKm, car.mileage);
      }
      const year = getAttribute(car, "an");
      if (typeof year === "number") {
        minYear = Math.min(minYear, year);
        maxYear = Math.max(maxYear, year);
      }

      const make = getAttribute(car, "marca");
      if (typeof make === "string" && make.trim()) {
        makeCounts[make] = (makeCounts[make] || 0) + 1;
      }
      const fuel = getAttribute(car, "combustibil");
      if (typeof fuel === "string" && fuel.trim()) {
        fuelCounts[fuel] = (fuelCounts[fuel] || 0) + 1;
      }
      const gearbox = getAttribute(car, "cutie de viteze");
      if (typeof gearbox === "string" && gearbox.trim()) {
        gearboxCounts[gearbox] = (gearboxCounts[gearbox] || 0) + 1;
      }
    });

    const sortedMakes = Object.entries(makeCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));

    const sortedFuels = Object.entries(fuelCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));

    const sortedGearboxes = Object.entries(gearboxCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));

    return {
      minPrice: minPrice === Infinity ? 0 : minPrice,
      maxPrice: maxPrice === -Infinity ? 100000 : maxPrice,
      minYear: minYear === Infinity ? 2000 : minYear,
      maxYear: maxYear === -Infinity ? 2026 : maxYear,
      minKm: minKm === Infinity ? 0 : minKm,
      maxKm: maxKm === -Infinity ? 500000 : maxKm,
      makes: sortedMakes,
      fuels: sortedFuels,
      gearboxes: sortedGearboxes,
    };
  }, [cars]);

  // Current numerical bounds from URL or fallback to stock min/max
  const currentPretMin = pretMinParam ? Number(pretMinParam) : stockMetrics.minPrice;
  const currentPretMax = pretMaxParam ? Number(pretMaxParam) : stockMetrics.maxPrice;
  const currentAnMin = anMinParam ? Number(anMinParam) : stockMetrics.minYear;
  const currentAnMax = anMaxParam ? Number(anMaxParam) : stockMetrics.maxYear;
  const currentKmMin = kmMinParam ? Number(kmMinParam) : stockMetrics.minKm;
  const currentKmMax = kmMaxParam ? Number(kmMaxParam) : stockMetrics.maxKm;

  // In-facet search for Marca
  const [makeSearch, setMakeSearch] = useState("");
  const [showAllMakes, setShowAllMakes] = useState(false);

  const filteredMakesList = useMemo(() => {
    if (!makeSearch.trim()) return stockMetrics.makes;
    return stockMetrics.makes.filter(m => m.name.toLowerCase().includes(makeSearch.toLowerCase().trim()));
  }, [stockMetrics.makes, makeSearch]);

  const visibleMakes = useMemo(() => {
    if (showAllMakes || makeSearch.trim()) return filteredMakesList;
    return filteredMakesList.slice(0, 8);
  }, [filteredMakesList, showAllMakes, makeSearch]);

  // Update query params helper
  const updateParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams, { replace: true });
  };

  const toggleMultiSelect = (key: string, currentValues: string[], item: string) => {
    let next: string[];
    if (currentValues.includes(item)) {
      next = currentValues.filter((v) => v !== item);
    } else {
      next = [...currentValues, item];
    }
    updateParam(key, next.length > 0 ? next.join(",") : null);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Perform 100% client-side filtering over the 50 cars
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // 1. Text search q
      if (qParam.trim()) {
        const query = qParam.toLowerCase().trim();
        const title = (car.title || "").toLowerCase();
        const desc = (car.description || "").toLowerCase();
        const make = String(getAttribute(car, "marca") || "").toLowerCase();
        const model = String(getAttribute(car, "model") || "").toLowerCase();
        if (!title.includes(query) && !desc.includes(query) && !make.includes(query) && !model.includes(query)) {
          return false;
        }
      }

      // 2. Marca multi-select
      if (marcaParam.length > 0) {
        const make = getAttribute(car, "marca");
        if (typeof make !== "string" || !marcaParam.includes(make)) {
          return false;
        }
      }

      // 3. Combustibil multi-select
      if (fuelParam.length > 0) {
        const fuel = getAttribute(car, "combustibil");
        if (typeof fuel !== "string" || !fuelParam.includes(fuel)) {
          return false;
        }
      }

      // 4. Cutie de viteze multi-select
      if (gearboxParam.length > 0) {
        const gearbox = getAttribute(car, "cutie de viteze");
        if (typeof gearbox !== "string" || !gearboxParam.includes(gearbox)) {
          return false;
        }
      }

      // 5. Price bounds — skip comparison if price is null
      if (car.price != null) {
        if (pretMinParam && car.price < currentPretMin) return false;
        if (pretMaxParam && car.price > currentPretMax) return false;
      }

      // 6. Mileage bounds — skip comparison if mileage is null
      if (car.mileage != null) {
        if (kmMinParam && car.mileage < currentKmMin) return false;
        if (kmMaxParam && car.mileage > currentKmMax) return false;
      }

      // 7. Year bounds — skip comparison if year is null
      const year = getAttribute(car, "an");
      if (typeof year === "number") {
        if (anMinParam && year < currentAnMin) return false;
        if (anMaxParam && year > currentAnMax) return false;
      }

      return true;
    });
  }, [
    cars, qParam, marcaParam, fuelParam, gearboxParam,
    pretMinParam, pretMaxParam, currentPretMin, currentPretMax,
    anMinParam, anMaxParam, currentAnMin, currentAnMax,
    kmMinParam, kmMaxParam, currentKmMin, currentKmMax,
  ]);

  // Client-side sorting
  const sortedCars = useMemo(() => {
    return [...filteredCars].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return (a.price ?? 0) - (b.price ?? 0);
        case "price_desc":
          return (b.price ?? 0) - (a.price ?? 0);
        case "mileage_asc":
          return (a.mileage ?? 0) - (b.mileage ?? 0);
        case "mileage_desc":
          return (b.mileage ?? 0) - (a.mileage ?? 0);
        default:
          return 0; // default API order
      }
    });
  }, [filteredCars, sortBy]);

  // Check if any filter is active
  const hasActiveFilters = Boolean(
    qParam || marcaParam.length > 0 || fuelParam.length > 0 || gearboxParam.length > 0 ||
    pretMinParam || pretMaxParam || anMinParam || anMaxParam || kmMinParam || kmMaxParam
  );

  // Facet Sidebar Component
  const FilterSidebarContent = () => (
    <div className="space-y-6">
      {/* Marca Facet */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground flex justify-between items-center">
          <span>Marca</span>
          <span className="text-xs text-muted-foreground">({stockMetrics.makes.length})</span>
        </h4>
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Caută marca..."
            value={makeSearch}
            onChange={(e) => setMakeSearch(e.target.value)}
            className="h-8 text-xs pl-8 bg-background/50 border-border/50 rounded-lg"
          />
        </div>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {visibleMakes.map(({ name, count }) => (
            <label key={name} className="flex items-center justify-between text-sm hover:text-primary cursor-pointer py-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={marcaParam.includes(name)}
                  onCheckedChange={() => toggleMultiSelect("marca", marcaParam, name)}
                />
                <span className="text-xs font-medium text-foreground/90">{name}</span>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums bg-muted/60 px-1.5 py-0.5 rounded-full">{count}</span>
            </label>
          ))}
        </div>
        {stockMetrics.makes.length > 8 && !makeSearch.trim() && (
          <button
            onClick={() => setShowAllMakes(!showAllMakes)}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1 pt-1"
          >
            {showAllMakes ? (
              <>Arată mai puține <ChevronUp size={14} /></>
            ) : (
              <>Arată toate ({stockMetrics.makes.length}) <ChevronDown size={14} /></>
            )}
          </button>
        )}
      </div>

      <hr className="border-border/40" />

      {/* Combustibil Facet */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Combustibil</h4>
        <div className="space-y-1.5">
          {stockMetrics.fuels.map(({ name, count }) => (
            <label key={name} className="flex items-center justify-between text-sm hover:text-primary cursor-pointer py-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={fuelParam.includes(name)}
                  onCheckedChange={() => toggleMultiSelect("combustibil", fuelParam, name)}
                />
                <span className="text-xs font-medium text-foreground/90">{name}</span>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums bg-muted/60 px-1.5 py-0.5 rounded-full">{count}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-border/40" />

      {/* Cutie de viteze Facet */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Cutie de viteze</h4>
        <div className="space-y-1.5">
          {stockMetrics.gearboxes.map(({ name, count }) => (
            <label key={name} className="flex items-center justify-between text-sm hover:text-primary cursor-pointer py-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={gearboxParam.includes(name)}
                  onCheckedChange={() => toggleMultiSelect("cutie", gearboxParam, name)}
                />
                <span className="text-xs font-medium text-foreground/90">{name}</span>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums bg-muted/60 px-1.5 py-0.5 rounded-full">{count}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-border/40" />

      {/* Preț Bounds */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-foreground">Preț (€)</h4>
          <span className="text-xs text-muted-foreground tabular-nums">
            {currentPretMin.toLocaleString("ro-RO")} - {currentPretMax.toLocaleString("ro-RO")} €
          </span>
        </div>
        <Slider
          value={[currentPretMin, currentPretMax]}
          min={stockMetrics.minPrice}
          max={stockMetrics.maxPrice}
          step={500}
          onValueChange={([min, max]) => {
            updateParam("pret_min", min > stockMetrics.minPrice ? String(min) : null);
            updateParam("pret_max", max < stockMetrics.maxPrice ? String(max) : null);
          }}
          className="accent-primary"
        />
      </div>

      <hr className="border-border/40" />

      {/* An Bounds */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-foreground">An Fabricație</h4>
          <span className="text-xs text-muted-foreground tabular-nums">
            {currentAnMin} - {currentAnMax}
          </span>
        </div>
        <Slider
          value={[currentAnMin, currentAnMax]}
          min={stockMetrics.minYear}
          max={stockMetrics.maxYear}
          step={1}
          onValueChange={([min, max]) => {
            updateParam("an_min", min > stockMetrics.minYear ? String(min) : null);
            updateParam("an_max", max < stockMetrics.maxYear ? String(max) : null);
          }}
          className="accent-primary"
        />
      </div>

      <hr className="border-border/40" />

      {/* Kilometraj Bounds */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-foreground">Kilometraj (km)</h4>
          <span className="text-xs text-muted-foreground tabular-nums">
            {currentKmMin.toLocaleString("ro-RO")} - {currentKmMax.toLocaleString("ro-RO")} km
          </span>
        </div>
        <Slider
          value={[currentKmMin, currentKmMax]}
          min={stockMetrics.minKm}
          max={stockMetrics.maxKm}
          step={5000}
          onValueChange={([min, max]) => {
            updateParam("km_min", min > stockMetrics.minKm ? String(min) : null);
            updateParam("km_max", max < stockMetrics.maxKm ? String(max) : null);
          }}
          className="accent-primary"
        />
      </div>
    </div>
  );

  return (
    <div className="section-padding pb-32">
      <PageMeta 
        title="Mașini în Stoc | Nițu Auto Park" 
        description="Descoperă oferta noastră curentă de mașini premium rulate. Garanție, verificare și finanțare rapidă." 
        canonicalUrl="https://www.nituautopark.ro/masini"
        ogUrl="https://www.nituautopark.ro/masini"
      />
      <SectionTitle title="Mașini în Stoc" subtitle="Descoperă oferta noastră curentă" gold />

      {/* Search Bar & Controls Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Caută marca, modelul sau versiunea..."
              value={qParam}
              onChange={(e) => updateParam("q", e.target.value.trim() ? e.target.value : null)}
              className="w-full rounded-full bg-muted/50 py-3 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/50"
            />
            {qParam && (
              <button
                onClick={() => updateParam("q", null)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <Select value={sortBy} onValueChange={(val) => updateParam("sort", val === "newest" ? null : val)}>
              <SelectTrigger className="w-[200px] border-border/50 bg-background rounded-full text-xs">
                <SelectValue placeholder="Ordonează după..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Cele mai recente</SelectItem>
                <SelectItem value="price_asc">Preț: crescător</SelectItem>
                <SelectItem value="price_desc">Preț: descrescător</SelectItem>
                <SelectItem value="mileage_asc">Kilometraj: crescător</SelectItem>
                <SelectItem value="mileage_desc">Kilometraj: descrescător</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Sheet Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden btn-outline-gold rounded-full p-2.5 flex items-center gap-1.5 text-xs font-semibold shrink-0">
                  <Filter size={16} />
                  <span>Filtre</span>
                  {hasActiveFilters && (
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm overflow-y-auto bg-card border-border">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-left">Filtrează Stocul</SheetTitle>
                </SheetHeader>
                <FilterSidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filter Pills & Results Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {filteredCars.length} din {cars.length} mașini
            </span>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {qParam && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                  Căutare: "{qParam}"
                  <button onClick={() => updateParam("q", null)} className="hover:text-destructive"><X size={12} /></button>
                </span>
              )}
              {marcaParam.map((m) => (
                <span key={m} className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                  {m}
                  <button onClick={() => toggleMultiSelect("marca", marcaParam, m)} className="hover:text-destructive"><X size={12} /></button>
                </span>
              ))}
              {fuelParam.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                  {f}
                  <button onClick={() => toggleMultiSelect("combustibil", fuelParam, f)} className="hover:text-destructive"><X size={12} /></button>
                </span>
              ))}
              {gearboxParam.map((g) => (
                <span key={g} className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                  {g}
                  <button onClick={() => toggleMultiSelect("cutie", gearboxParam, g)} className="hover:text-destructive"><X size={12} /></button>
                </span>
              ))}
              {(pretMinParam || pretMaxParam) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                  Preț: {currentPretMin.toLocaleString("ro-RO")} - {currentPretMax.toLocaleString("ro-RO")} €
                  <button onClick={() => { updateParam("pret_min", null); updateParam("pret_max", null); }} className="hover:text-destructive"><X size={12} /></button>
                </span>
              )}
              {(anMinParam || anMaxParam) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                  An: {currentAnMin} - {currentAnMax}
                  <button onClick={() => { updateParam("an_min", null); updateParam("an_max", null); }} className="hover:text-destructive"><X size={12} /></button>
                </span>
              )}
              {(kmMinParam || kmMaxParam) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                  Km: {currentKmMin.toLocaleString("ro-RO")} - {currentKmMax.toLocaleString("ro-RO")} km
                  <button onClick={() => { updateParam("km_min", null); updateParam("km_max", null); }} className="hover:text-destructive"><X size={12} /></button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-destructive hover:underline ml-2"
              >
                Șterge tot
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Main Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Facet Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 glass-card rounded-2xl p-5 h-fit sticky top-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Filter size={18} className="gold-icon" />
              Filtrează Stocul
            </h3>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="text-xs text-destructive hover:underline font-semibold">
                Șterge tot
              </button>
            )}
          </div>
          <FilterSidebarContent />
        </aside>

        {/* Listings Grid */}
        <main className="lg:col-span-3">
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

              {!isLoading && !isError && sortedCars && sortedCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </AnimatePresence>
          </motion.div>

          {!isLoading && !isError && sortedCars.length === 0 && (
            <div className="col-span-full mt-12 flex flex-col items-center gap-3 text-center text-muted-foreground glass-card rounded-2xl p-12">
              <Car className="h-12 w-12 gold-icon" />
              <p className="text-lg font-bold text-foreground">Nu am găsit nicio mașină care să corespundă filtrelor.</p>
              <p className="text-sm">Încearcă să elimini din filtre {marcaParam.length ? `(${marcaParam.join(", ")})` : ""} sau să ajustezi căutarea.</p>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="btn-gold rounded-full px-6 py-2.5 text-xs mt-2 font-semibold">
                  Resetează toate filtrele
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Inventory;
