import { motion } from "framer-motion";
import { Truck, FileText, AlertTriangle, Shield, BadgeCheck } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const services = [
  {
    icon: Truck,
    title: "Livrare pe Platformă",
    desc: "Transport premium pe tot teritoriul României. Mașina ta ajunge în siguranță, direct la ușa ta.",
  },
  {
    icon: FileText,
    title: "Numere Roșii",
    desc: "Servicii complete de înmatriculare temporară pentru test drive și transfer.",
  },
  {
    icon: Shield,
    title: "Verificare Tehnică",
    desc: "Fiecare mașină trece printr-o inspecție completă înainte de vânzare.",
  },
  {
    icon: BadgeCheck,
    title: "Garanție Inclusă",
    desc: "Toate mașinile noastre vin cu garanție pentru liniștea ta.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Services = () => (
  <div className="section-padding pb-24">
    <SectionTitle title="Serviciile Noastre" subtitle="Tot ce ai nevoie, într-un singur loc" gold />

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          className="glass-card-gold rounded-xl p-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <s.icon size={32} className="mb-3 gold-icon" />
          <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
          <p className="text-sm text-muted-foreground">{s.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* Buy-Back Disclaimer */}
    <motion.div
      className="mt-10 glass-card rounded-xl p-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle size={24} className="mt-0.5 shrink-0 text-primary" />
        <div>
          <h4 className="mb-1 font-bold">Serviciu Buy-Back — Momentan Indisponibil</h4>
          <p className="text-sm text-muted-foreground">
            Din motive operaționale, serviciul de buy-back este temporar suspendat. Urmărim
            reintroducerea acestuia în viitorul apropiat. Pentru orice întrebare, nu ezitați să
            ne contactați.
          </p>
        </div>
      </div>
    </motion.div>
  </div>
);

export default Services;
