import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowRight, Send, Loader2, CheckCircle2, Calculator } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitContactForm } from "@/services/api";
import tbiLogo from "@/assets/tbi_bank.png";
import mogoLogo from "@/assets/mogo.png";
import PageMeta from "@/components/PageMeta";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const financingFormSchema = z.object({
  name: z.string().min(2, "Numele este obligatoriu."),
  email: z.string().email("Adresa de email este invalidă."),
  phone: z.string().min(6, "Numărul de telefon este obligatoriu."),
  amount: z.string().min(1, "Suma este obligatorie."),
  message: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, "Trebuie să fii de acord cu Politica de Confidențialitate."),
});

const Financing = () => {
  const [searchParams] = useSearchParams();
  const initialAmount = Number(searchParams.get("suma")) || 15000;
  const [amount, setAmount] = useState(initialAmount);
  const [months, setMonths] = useState(48);
  const rate = 0.009; // monthly
  const initialMonthly = Math.round((initialAmount * (rate * Math.pow(1 + rate, 48))) / (Math.pow(1 + rate, 48) - 1));
  const monthly = Math.round((amount * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1));

  const [openAccordion, setOpenAccordion] = useState<string | undefined>("item-1");
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof financingFormSchema>>({
    resolver: zodResolver(financingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      amount: String(initialAmount),
      message: `Solicitare finanțare pentru suma de ${initialAmount} € pe o perioadă de 48 luni (rată estimată: ${initialMonthly} €/lună).`,
      termsAccepted: false,
    },
  });

  const { dirtyFields } = form.formState;

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    const newMonthly = Math.round((newAmount * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1));

    if (!dirtyFields.amount) {
      form.setValue("amount", String(newAmount));
    }

    if (!dirtyFields.message) {
      form.setValue("message", `Solicitare finanțare pentru suma de ${newAmount} € pe o perioadă de ${months} luni (rată estimată: ${newMonthly} €/lună).`);
    }
  };

  const handleMonthsChange = (newMonths: number) => {
    setMonths(newMonths);
    const newMonthly = Math.round((amount * (rate * Math.pow(1 + rate, newMonths))) / (Math.pow(1 + rate, newMonths) - 1));

    if (!dirtyFields.amount) {
      form.setValue("amount", String(amount));
    }

    if (!dirtyFields.message) {
      form.setValue("message", `Solicitare finanțare pentru suma de ${amount} € pe o perioadă de ${newMonths} luni (rată estimată: ${newMonthly} €/lună).`);
    }
  };

  const handleRequestOffer = () => {
    document.getElementById("formular-finantare")?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: z.infer<typeof financingFormSchema>) => {
    const fullMessage = `
Solicitare Finanțare Auto:
---------------------------
Suma dorită: ${data.amount} €
Calcul orientativ: ${amount} € pe ${months} luni (${monthly} €/lună)
---------------------------
Mesaj / Detalii client:
${data.message || "Niciun detaliu suplimentar."}
    `.trim();

    try {
      await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: fullMessage,
        type: "FINANCING",
      });
      setSubmitted(true);
      toast.success("Solicitarea de finanțare a fost trimisă cu succes!");
    } catch (err) {
      toast.error("Eroare la trimiterea solicitării", {
        description: err instanceof Error ? err.message : "Vă rugăm încercați din nou.",
      });
    }
  };

  return (
    <div className="section-padding pb-44">
      <PageMeta 
        title="Finanțare Auto | Nițu Auto Park" 
        description="Aprobare rapidă pentru rate auto doar cu buletinul, inclusiv pentru istoric negativ în biroul de credit." 
        canonicalUrl="https://www.nituautopark.ro/finantare"
        ogUrl="https://www.nituautopark.ro/finantare"
      />
      <SectionTitle title="Finanțare Auto" subtitle="Rate doar cu buletinul — simplu și rapid" gold />

      {/* Calculator */}
      <motion.div
        className="glass-card-gold mx-auto mb-12 max-w-md rounded-2xl p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-4 text-lg font-bold flex items-center gap-2">
          <Calculator size={20} className="gold-icon" />
          Calculator Rate
        </h3>
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
            onChange={(e) => handleAmountChange(Number(e.target.value))}
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
            onChange={(e) => handleMonthsChange(Number(e.target.value))}
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
        <button onClick={handleRequestOffer} className="btn-gold mt-4 w-full rounded-xl py-3 text-sm font-semibold">
          Aplică pentru Finanțare
        </button>
      </motion.div>

      {/* Partners */}
      <SectionTitle title="Partenerii Noștri de Încredere" subtitle="Soluții de creditare adaptate nevoilor tale" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
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

      {/* Inline Financing Form */}
      <div id="formular-finantare" className="scroll-mt-24 max-w-2xl mx-auto glass-card-gold rounded-2xl p-6">
        <h3 className="text-xl font-bold text-foreground mb-1">Solicită Ofertă de Finanțare</h3>
        <p className="text-xs text-muted-foreground mb-6">Completează datele tale și consultanții noștri te vor contacta cu dosarul pre-aprobat.</p>

        {submitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center min-h-[250px]">
            <CheckCircle2 size={56} className="text-primary mb-3" />
            <h4 className="font-bold text-xl mb-1">Solicitarea a fost trimisă!</h4>
            <p className="text-sm text-muted-foreground">Un reprezentant al departamentului de finanțare te va contacta în cel mai scurt timp.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume și Prenume</FormLabel>
                    <FormControl><Input placeholder="ex: Ion Popescu" aria-label="Nume și Prenume" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl><Input type="tel" placeholder="ex: 0745 000 000" aria-label="Telefon" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresă Email</FormLabel>
                    <FormControl><Input type="email" placeholder="ex: ion.popescu@email.com" aria-label="Adresă Email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="amount" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suma Dorită (€)</FormLabel>
                    <FormControl><Input type="number" placeholder="ex: 15000" aria-label="Suma Dorită în euro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesaj / Detalii Suplimentare (Opțional)</FormLabel>
                  <FormControl><Textarea rows={3} placeholder="Menționează venitul lunar, vechimea la job sau alte detalii..." aria-label="Mesaj / Detalii Suplimentare" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="termsAccepted" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-1">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-xs font-normal text-muted-foreground cursor-pointer">
                      Sunt de acord cu <Link to="/politica-de-confidentialitate" target="_blank" className="text-primary underline hover:text-primary/80">Politica de Confidențialitate</Link> și prelucrarea datelor.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="btn-gold w-full rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2 mt-2"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Se trimite...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Trimite Solicitarea de Finanțare
                  </>
                )}
              </button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Financing;
