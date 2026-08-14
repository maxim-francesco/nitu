import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Car, Wallet, Settings, User, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/services/api";
import PageMeta from "@/components/PageMeta";

const steps = [
  { icon: Car, label: "Tipul Mașinii" },
  { icon: Wallet, label: "Buget" },
  { icon: Settings, label: "Preferințe" },
  { icon: User, label: "Contact" },
];

const carTypes = ["SUV", "Sedan", "Sport", "Break", "Hatchback", "Coupe"];
const budgets = ["Sub 10.000 €", "10.000 – 20.000 €", "20.000 – 35.000 €", "35.000 – 50.000 €", "Peste 50.000 €"];
const fuels = ["Diesel", "Benzină", "Hybrid", "Electric"];

const formSchema = z.object({
  carType: z.string().min(1, "Te rugăm selectează un tip de mașină."),
  budget: z.string().min(1, "Te rugăm selectează un buget."),
  fuel: z.string().min(1, "Te rugăm selectează combustibilul."),
  name: z.string().min(2, "Numele este obligatoriu."),
  email: z.string().email("Adresa de email este invalidă."),
  phone: z.string().optional(),
  details: z.string().optional(),
});

const CustomOrder = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carType: "",
      budget: "",
      fuel: "",
      name: "",
      email: "",
      phone: "",
      details: "",
    },
  });

  const { trigger, formState: { isSubmitting } } = form;

  const next = async () => {
    let fields: (keyof z.infer<typeof formSchema>)[] = [];
    if (step === 0) fields = ["carType"];
    if (step === 1) fields = ["budget"];
    if (step === 2) fields = ["fuel"];

    const isValid = await trigger(fields);
    if (isValid && step < 3) {
      setStep((s) => s + 1);
    }
  };

  const prev = () => step > 0 && setStep(step - 1);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const message = `
Cerere mașină la comandă:
---------------------------
Tip mașină: ${data.carType}
Buget: ${data.budget}
Combustibil: ${data.fuel}
---------------------------
Detalii suplimentare de la client:
${data.details || "Niciun detaliu suplimentar."}
    `.trim();

    try {
      await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: message,
        type: "ORDER",
      });
      setSubmitted(true);
    } catch (error) {
      toast.error("Eroare la trimitere", {
        description: error instanceof Error ? error.message : "Vă rugăm încercați din nou.",
      });
    }
  }

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

  const carTypeValue = form.watch("carType");
  const budgetValue = form.watch("budget");
  const fuelValue = form.watch("fuel");

  return (
    <div className="section-padding pb-24">
      <PageMeta 
        title="Mașini la Comandă | Nițu Auto Park" 
        description="Spune-ne ce cauți și noi găsim mașina perfectă pentru tine și bugetul tău." 
        canonicalUrl="https://www.nituautopark.ro/comanda"
        ogUrl="https://www.nituautopark.ro/comanda"
      />
      <SectionTitle
        title="Mașini la Comandă"
        subtitle="Spune-ne ce cauți și noi o găsim pentru tine"
        gold
      />

      <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${ i <= step ? "gold-gradient" : "bg-muted" }`}>
              <s.icon size={18} className={i <= step ? "text-primary-foreground" : "text-muted-foreground"} />
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 rounded transition-colors ${i < step ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <h3 className="mb-4 text-center text-lg font-bold">Ce tip de mașină dorești?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {carTypes.map((t) => (
                      <button key={t} type="button" onClick={() => form.setValue("carType", t)} className={`rounded-xl p-4 text-sm font-medium transition-all active:scale-95 ${carTypeValue === t ? "gold-gradient text-primary-foreground" : "glass-card"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <FormMessage>{form.formState.errors.carType?.message}</FormMessage>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <h3 className="mb-4 text-center text-lg font-bold">Care este bugetul tău?</h3>
                  {budgets.map((b) => (
                    <button key={b} type="button" onClick={() => form.setValue("budget", b)} className={`w-full rounded-xl p-4 text-sm font-medium transition-all active:scale-95 ${budgetValue === b ? "gold-gradient text-primary-foreground" : "glass-card"}`}>
                      {b}
                    </button>
                  ))}
                  <FormMessage>{form.formState.errors.budget?.message}</FormMessage>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <h3 className="mb-4 text-center text-lg font-bold">Combustibil preferat?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {fuels.map((f) => (
                      <button key={f} type="button" onClick={() => form.setValue("fuel", f)} className={`rounded-xl p-4 text-sm font-medium transition-all active:scale-95 ${fuelValue === f ? "gold-gradient text-primary-foreground" : "glass-card"}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <FormMessage>{form.formState.errors.fuel?.message}</FormMessage>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h3 className="mb-4 text-center text-lg font-bold">Datele tale de contact</h3>
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nume și Prenume</FormLabel>
                      <FormControl><Input placeholder="ex: Ion Popescu" aria-label="Nume și Prenume" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresă de Email</FormLabel>
                      <FormControl><Input type="email" placeholder="ex: ion.popescu@email.com" aria-label="Adresă de Email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon (Opțional)</FormLabel>
                      <FormControl><Input type="tel" placeholder="ex: 0712 345 678" aria-label="Telefon" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="details" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alte detalii (Opțional)</FormLabel>
                      <FormControl><Textarea placeholder="Caut o mașină de familie, an fabricație după 2020..." aria-label="Alte detalii" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex gap-3">
              {step > 0 && (
                <button type="button" onClick={prev} className="btn-outline-gold flex-1 rounded-xl py-3 text-sm flex items-center justify-center gap-1">
                  <ArrowLeft size={16} /> Înapoi
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={next} className="btn-gold flex-1 rounded-xl py-3 text-sm flex items-center justify-center gap-1">
                  Continuă <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting} className="btn-gold flex-1 rounded-xl py-3 text-sm flex items-center justify-center gap-1">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Se trimite...
                    </>
                  ) : (
                    <>
                      Trimite Cererea <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CustomOrder;
