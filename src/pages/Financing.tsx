import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, FileCheck, Clock, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const benefits = [
  { icon: FileCheck, title: "Doar cu Buletinul", desc: "Fără acte complicate sau garanții suplimentare." },
  { icon: Clock, title: "Aprobare Rapidă", desc: "Răspuns în maxim 24 de ore." },
  { icon: CreditCard, title: "Rate Flexibile", desc: "Perioade de 12 până la 84 de luni." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Financing = () => {
  const [searchParams] = useSearchParams();
  const initialAmount = Number(searchParams.get("suma")) || 15000;
  const [amount, setAmount] = useState(initialAmount);
  const [months, setMonths] = useState(48);
  const rate = 0.009; // monthly
  const monthly = Math.round(amount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1));

  return (
    <div className="section-padding pb-24">
      <SectionTitle
        title="Finanțare Auto"
        subtitle="Rate doar cu buletinul — simplu și rapid"
        gold
      />

      {/* Loan Calculator */}
      <motion.div
        className="glass-card-gold mx-auto max-w-md rounded-2xl p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-4 text-lg font-bold">Calculator Rate</h3>

        <div className="mb-4">
          <label className="mb-1 flex justify-between text-sm text-muted-foreground">
            <span>Valoare mașină</span>
            <span className="font-semibold text-primary">{amount.toLocaleString("ro-RO")} €</span>
          </label>
          <input
            type="range"
            min={3000}
            max={60000}
            step={500}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 flex justify-between text-sm text-muted-foreground">
            <span>Perioadă</span>
            <span className="font-semibold text-primary">{months} luni</span>
          </label>
          <input
            type="range"
            min={12}
            max={84}
            step={6}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="rounded-xl bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">Rată lunară estimată</p>
          <p className="text-3xl font-bold gold-gradient-text">{monthly} € / lună</p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            *Calcul orientativ. Rata finală depinde de profilul dvs.
          </p>
        </div>

        <button className="btn-gold mt-4 w-full rounded-xl py-3 text-sm">
          Solicită Finanțare <ArrowRight size={16} className="ml-1 inline" />
        </button>
      </motion.div>

      {/* Partners */}
      <div className="mt-10 text-center">
        <p className="mb-4 text-sm text-muted-foreground">Parteneri de finanțare</p>
        <div className="flex items-center justify-center gap-8">
          <div className="glass-card rounded-xl px-6 py-3">
            <span className="text-lg font-bold gold-gradient-text">TBI Bank</span>
          </div>
          <div className="glass-card rounded-xl px-6 py-3">
            <span className="text-lg font-bold gold-gradient-text">MOGO</span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            className="glass-card rounded-xl p-5 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <b.icon size={28} className="mx-auto mb-3 gold-icon" />
            <h4 className="mb-1 font-bold">{b.title}</h4>
            <p className="text-sm text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Financing;
