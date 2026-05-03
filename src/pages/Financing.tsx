import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import tbiLogo from "@/assets/tbi_bank.png";
import mogoLogo from "@/assets/mogo.png";
import PageMeta from "@/components/PageMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Financing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialAmount = Number(searchParams.get("suma")) || 15000;
  const [amount, setAmount] = useState(initialAmount);
  const [months, setMonths] = useState(48);
  const rate = 0.009; // monthly
  const monthly = Math.round((amount * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1));
  const [openAccordion, setOpenAccordion] = useState<string | undefined>("item-1");

  const handleRequestOffer = () => {
    navigate("/contact");
  };

  return (
    <div className="section-padding pb-24">
      <PageMeta 
        title="Finanțare Auto | Nițu Auto Park" 
        description="Aprobare rapidă pentru rate auto doar cu buletinul, inclusiv pentru istoric negativ în biroul de credit." 
        canonicalUrl="https://www.nituautopark.ro/finantare"
        ogUrl="https://www.nituautopark.ro/finantare"
      />
      <SectionTitle title="Finanțare Auto" subtitle="Rate doar cu buletinul — simplu și rapid" gold />

      <motion.div
        className="glass-card-gold mx-auto mb-12 max-w-md rounded-2xl p-6"
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
            aria-label="Valoare mașină"
            aria-valuemin={3000}
            aria-valuemax={60000}
            aria-valuenow={amount}
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
            aria-label="Perioadă creditare în luni"
            aria-valuemin={12}
            aria-valuemax={84}
            aria-valuenow={months}
          />
        </div>
        <div className="rounded-xl bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">Rată lunară estimată</p>
          <p className="text-3xl font-bold gold-gradient-text">{monthly} € / lună</p>
          <p className="mt-1 text-xs text-muted-foreground/60">*Calcul orientativ. Rata finală depinde de profilul dvs.</p>
        </div>
      </motion.div>

      <SectionTitle title="Partenerii Noștri de Încredere" subtitle="Soluții de creditare adaptate nevoilor tale" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          className="glass-card flex flex-col rounded-2xl p-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <img src={tbiLogo} alt="Logo partener de finanțare TBI Bank" className="mb-4 h-10 w-auto self-start rounded bg-white px-2 py-1" />
          <div className="flex-grow">
            <p className="text-muted-foreground text-sm mb-4">
              Soluții de finanțare flexibile pentru persoane fizice și juridice, cu aprobare rapidă.
            </p>
            <Accordion type="single" collapsible value={openAccordion} onValueChange={setOpenAccordion} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Persoane Fizice</AccordionTrigger>
                <AccordionContent className="prose prose-sm prose-invert max-w-none text-muted-foreground">
                  {openAccordion === "item-1" && (
                    <>
                      <h4 className="text-foreground">Criterii de eligibilitate:</h4>
                      <ul>
                        <li>Vârstă între 18 și 75 de ani.</li>
                        <li>Minim 3 luni la actualul angajator.</li>
                        <li>Salariu minim: 2000 RON / Pensie minimă: 1250 RON.</li>
                      </ul>
                      <h4 className="text-foreground">Venituri acceptate:</h4>
                      <p>Salarii, pensii, PFA, diurne, chirii, dividente, indemnizații.</p>
                      <h4 className="text-foreground">Bonus:</h4>
                      <p>Acceptăm codebitor pentru susținerea dosarului.</p>
                      <h4 className="text-foreground">Detalii finanțare:</h4>
                      <ul>
                        <li>Sume între 3.000 și 150.000 RON.</li>
                        <li>Răspuns rapid: 15 - 120 minute.</li>
                      </ul>
                      <h4 className="text-foreground">Venituri din străinătate:</h4>
                      <p>
                        Contract de muncă pe perioadă nedeterminată cu minim 6 luni vechime. Este necesar un girant cu
                        venituri din România doar dacă nu aveți istoric de credit în ultimii 5 ani.
                      </p>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Persoane Juridice</AccordionTrigger>
                <AccordionContent className="prose prose-sm prose-invert max-w-none text-muted-foreground">
                  {openAccordion === "item-2" && (
                    <>
                      <h4 className="text-foreground">Criterii de eligibilitate:</h4>
                      <ul>
                        <li>Vechime firmă: minim 1 an.</li>
                        <li>
                          Cifra de afaceri: minim 500.000 RON (1.500.000 RON pentru transport/construcții).
                        </li>
                        <li>Ultimul bilanț contabil depus.</li>
                      </ul>
                      <h4 className="text-foreground">Detalii finanțare:</h4>
                      <ul>
                        <li>Finanțare de până la 250.000 RON.</li>
                        <li>Suma maximă finanțată: 10% din cifra de afaceri.</li>
                      </ul>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <button onClick={handleRequestOffer} className="btn-gold mt-auto w-full rounded-xl py-3 text-sm mt-4">
            Cere Ofertă TBI <ArrowRight size={16} className="ml-1 inline" />
          </button>
        </motion.div>

        <motion.div
          className="glass-card flex flex-col rounded-2xl p-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, delay: 0.1 }}
        >
          <img src={mogoLogo} alt="Logo partener de finanțare Mogo" className="mb-4 h-10 w-auto self-start rounded bg-white px-2 py-1" />
          <div className="flex-grow">
            <p className="text-muted-foreground text-sm mb-4">
              Credit auto rapid și accesibil, chiar și pentru situații financiare mai complexe.
            </p>
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg mt-4">
              <h4 className="font-bold text-primary">Soluția pentru tine!</h4>
              <p className="text-primary/90 text-sm font-medium">
                Finanțăm persoane cu istoric negativ în biroul de credit.
              </p>
            </div>
          </div>
          <button onClick={handleRequestOffer} className="btn-gold mt-auto w-full rounded-xl py-3 text-sm mt-6">
            Cere Ofertă Mogo <ArrowRight size={16} className="ml-1 inline" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Financing;
