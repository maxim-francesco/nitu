import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Wallet, Settings, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const steps = [
  { icon: Car, label: "Tipul Mașinii" },
  { icon: Wallet, label: "Buget" },
  { icon: Settings, label: "Preferințe" },
];

const carTypes = ["SUV", "Sedan", "Sport", "Break", "Hatchback", "Coupe"];
const budgets = ["Sub 10.000 €", "10.000 – 20.000 €", "20.000 – 35.000 €", "35.000 – 50.000 €", "Peste 50.000 €"];
const fuels = ["Diesel", "Benzină", "Hybrid", "Electric"];

const CustomOrder = () => {
  const [step, setStep] = useState(0);
  const [carType, setCarType] = useState("");
  const [budget, setBudget] = useState("");
  const [fuel, setFuel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const next = () => step < 2 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  if (submitted) {
    return (
      <div className="section-padding flex min-h-[70vh] flex-col items-center justify-center pb-24 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <CheckCircle size={64} className="mx-auto mb-4 gold-icon" />
        </motion.div>
        <h2 className="text-2xl font-bold">Cererea a fost trimisă!</h2>
        <p className="mt-2 text-muted-foreground">
          Te vom contacta în cel mai scurt timp cu opțiuni personalizate.
        </p>
      </div>
    );
  }

  return (
    <div className="section-padding pb-24">
      <SectionTitle
        title="Mașini la Comandă"
        subtitle="Spune-ne ce cauți și noi o găsim pentru tine"
        gold
      />

      {/* Step Indicator */}
      <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                i <= step ? "gold-gradient" : "bg-muted"
              }`}
            >
              <s.icon size={18} className={i <= step ? "text-primary-foreground" : "text-muted-foreground"} />
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-8 rounded ${i < step ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Steps Content */}
      <div className="mx-auto max-w-md">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h3 className="mb-4 text-center text-lg font-bold">Ce tip de mașină dorești?</h3>
              <div className="grid grid-cols-2 gap-3">
                {carTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setCarType(t)}
                    className={`rounded-xl p-4 text-sm font-medium transition-all active:scale-95 ${
                      carType === t ? "gold-gradient text-primary-foreground" : "glass-card"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h3 className="mb-4 text-center text-lg font-bold">Care este bugetul tău?</h3>
              {budgets.map((b) => (
                <button
                  key={b}
                  onClick={() => setBudget(b)}
                  className={`w-full rounded-xl p-4 text-sm font-medium transition-all active:scale-95 ${
                    budget === b ? "gold-gradient text-primary-foreground" : "glass-card"
                  }`}
                >
                  {b}
                </button>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h3 className="mb-4 text-center text-lg font-bold">Combustibil preferat?</h3>
              <div className="grid grid-cols-2 gap-3">
                {fuels.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFuel(f)}
                    className={`rounded-xl p-4 text-sm font-medium transition-all active:scale-95 ${
                      fuel === f ? "gold-gradient text-primary-foreground" : "glass-card"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button onClick={prev} className="btn-outline-gold flex-1 rounded-xl py-3 text-sm">
              <ArrowLeft size={16} className="mr-1 inline" /> Înapoi
            </button>
          )}
          {step < 2 ? (
            <button onClick={next} className="btn-gold flex-1 rounded-xl py-3 text-sm">
              Continuă <ArrowRight size={16} className="ml-1 inline" />
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="btn-gold flex-1 rounded-xl py-3 text-sm"
            >
              Trimite Cererea <ArrowRight size={16} className="ml-1 inline" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;
