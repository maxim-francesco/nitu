import { motion } from "framer-motion";
import { ArrowRight, Car, Shield, Star, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import heroImg from "@/assets/nitubanner.png";
import logo from "@/assets/logo.png";
import SectionTitle from "@/components/SectionTitle";
import { CarCard, CarCardSkeleton } from "@/components/CarCard";
import { getListings } from "@/services/api";
import PageMeta from "@/components/PageMeta";

const stats = [
  { icon: Car, value: "200+", label: "Mașini Vândute" },
  { icon: Star, value: "5★", label: "Rating Clienți" },
  { icon: Shield, value: "100%", label: "Garanție & Siguranță" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const RecentlyAdded = () => {
  const navigate = useNavigate();
  const { data: recentCars, isLoading, isError } = useQuery({
    queryKey: ['recentListings'],
    queryFn: () => getListings({ limit: 3, sortBy: 'newest' }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section className="section-padding">
      <SectionTitle title="Ultimele adăugate în stoc" subtitle="Descoperă cele mai noi oferte sosite la Nițu Auto Park" gold />
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {isLoading && Array.from({ length: 3 }).map((_, i) => <CarCardSkeleton key={i} />)}
        
        {!isLoading && !isError && recentCars && recentCars.map((car, index) => (
          <CarCard key={car.id} car={car} priority={index === 0} />
        ))}
      </motion.div>

      {isError && (
        <div className="col-span-full mt-8 text-center text-muted-foreground flex flex-col items-center gap-2">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p>Nu am putut încărca mașinile recente.</p>
        </div>
      )}

      {!isLoading && recentCars && recentCars.length > 0 && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => navigate("/masini")}
              className="btn-gold rounded-full px-6 py-3 text-sm"
            >
              Vezi tot stocul <ArrowRight size={16} className="ml-1 inline" />
            </button>
          </motion.div>
      )}
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageMeta 
        title="Nițu Auto Park | Mașini Rulate Premium" 
        description="Dealer premium de mașini second-hand în Câmpina. Finanțare, livrare și servicii complete." 
        canonicalUrl="https://www.nituautopark.ro/"
        ogUrl="https://www.nituautopark.ro/"
      />
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        {/* TODO: Pentru performanță maximă, convertește manual nitubanner.png în format WebP și plasează-l în folderul public/ */}
        <picture>
          {/* <source srcSet="/nitubanner.webp" type="image/webp" /> */}
          <img
            src={heroImg}
            alt="Showroom Nițu Auto Park"
            width={1920}
            height={1080}
            loading="eager"
            fetchpriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[28%_center] md:object-center"
          />
        </picture>

        <motion.div
          className="absolute left-4 top-12 z-10 md:left-8 md:top-16"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* TODO: Convertește manual logo.png în WebP și plasează-l în public/ pentru o încărcare mai rapidă */}
          <picture>
            {/* <source srcSet="/logo.webp" type="image/webp" /> */}
            <img
              src={logo}
              alt="Logo Nițu Auto Park"
              width={300}
              height={160}
              loading="lazy"
              className="h-32 w-auto drop-shadow-xl md:h-40"
            />
          </picture>
        </motion.div>

        <div className="relative flex h-full flex-col items-center justify-end px-4 pb-16 text-center">
          <motion.h1
            className="mb-3 text-3xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Mașina Ta de Vis,{" "}
            <span className="gold-gradient-text">La Prețul Corect</span>
          </motion.h1>
          <motion.p
            className="mb-6 max-w-md text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Dealer premium de mașini second-hand în Câmpina. Finanțare, livrare și servicii complete.
          </motion.p>
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <button
              onClick={() => navigate("/masini")}
              className="btn-gold rounded-full px-6 py-3 text-sm font-semibold"
            >
              Vezi Stocul <ArrowRight size={16} className="ml-1 inline" />
            </button>
            <button
              onClick={() => navigate("/finantare")}
              className="btn-outline-gold rounded-full px-6 py-3 text-sm"
            >
              Finanțare
            </button>
          </motion.div>
        </div>
      </section>

      {/* Recently Added */}
      <RecentlyAdded />

      {/* Stats */}
      <section className="section-padding">
        <motion.div
          className="glass-card rounded-2xl p-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <s.icon size={28} className="mx-auto mb-2 gold-icon" />
                <p className="text-2xl font-bold gold-gradient-text">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
