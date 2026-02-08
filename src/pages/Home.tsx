import { motion } from "framer-motion";
import { ArrowRight, Car, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-car.jpg";
import suvImg from "@/assets/car-suv.jpg";
import sedanImg from "@/assets/car-sedan.jpg";
import sportImg from "@/assets/car-sport.jpg";
import logo from "@/assets/logo.png";
import SectionTitle from "@/components/SectionTitle";

const categories = [
  { name: "SUV", image: suvImg, desc: "Confort & Putere" },
  { name: "Sedan", image: sedanImg, desc: "Eleganță Clasică" },
  { name: "Sport", image: sportImg, desc: "Adrenalină Pură" },
];

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

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        <img
          src={heroImg}
          alt="Showroom Nițu Auto Park"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="relative flex h-full flex-col items-center justify-end px-4 pb-16 text-center">
          <motion.img
            src={logo}
            alt="Nițu Auto Park"
            className="mb-6 h-28 w-auto drop-shadow-2xl md:h-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          />
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

      {/* Categories */}
      <section className="section-padding">
        <SectionTitle title="Alege Categoria" subtitle="Ce tip de mașină cauți?" gold />
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={fadeUp}
              onClick={() => navigate("/masini")}
              className="glass-card-gold group cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

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
