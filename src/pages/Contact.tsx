import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import PageMeta from "@/components/PageMeta";
import LazyIframe from "@/components/LazyIframe";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitContactForm } from "@/services/api";

const contactInfo = [
  { icon: MapPin, label: "Adresa", value: "Bulevardul Nicolae Bălcescu, 105600, Câmpina, România" },
  { icon: Phone, label: "Telefon", value: "0745 461 202" },
  { icon: Mail, label: "Email", value: "andrei9940@yahoo.com" },
  { icon: Clock, label: "Program", value: "Deschis Non-Stop" },
];

const contactFormSchema = z.object({
  name: z.string().min(2, "Numele este obligatoriu."),
  email: z.string().email("Adresa de email este invalidă."),
  phone: z.string().min(6, "Numărul de telefon este obligatoriu."),
  message: z.string().min(5, "Mesajul este obligatoriu."),
  termsAccepted: z.boolean().refine((val) => val === true, "Trebuie să fii de acord cu Politica de Confidențialitate."),
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    try {
      await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        type: "GENERAL",
      });
      setSubmitted(true);
      toast.success("Mesajul a fost trimis cu succes!");
    } catch (err) {
      toast.error("Eroare la trimiterea mesajului", {
        description: err instanceof Error ? err.message : "Vă rugăm încercați din nou.",
      });
    }
  };

  return (
    <div className="section-padding pb-44">
      <PageMeta 
        title="Contact | Nițu Auto Park" 
        description="Contactează-ne pentru orice întrebare. Bulevardul Nicolae Bălcescu, Câmpina." 
        canonicalUrl="https://www.nituautopark.ro/contact"
        ogUrl="https://www.nituautopark.ro/contact"
      />
      <SectionTitle title="Contact & Locație" subtitle="Vino să ne cunoști sau trimite-ne un mesaj" gold />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Map & Contact Info */}
        <div className="space-y-6">
          <motion.div
            className="overflow-hidden rounded-2xl glass-card-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <LazyIframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.7721034959973!2d25.744898199999994!3d45.1106876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b3ab680224cf41%3A0x60af4cb8f704c587!2sAuto-Park%20Ni%C8%9Bu!5e0!3m2!1sen!2sro!4v1770563591102!5m2!1sen!2sro&hl=ro"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups"
              title="Locație Nițu Auto Park"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                className="glass-card flex items-start gap-4 rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <item.icon size={22} className="mt-0.5 shrink-0 gold-icon" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* General Contact Form */}
        <motion.div
          className="glass-card-gold rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-foreground mb-1">Trimite-ne un Mesaj</h3>
          <p className="text-xs text-muted-foreground mb-6">Ai întrebări despre parcul nostru sau despre o mașină? Scrie-ne mai jos.</p>

          {submitted ? (
            <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
              <CheckCircle2 size={56} className="text-primary mb-3" />
              <h4 className="font-bold text-xl mb-1">Mesajul a fost trimis!</h4>
              <p className="text-sm text-muted-foreground">Echipa Nițu Auto Park îți va răspunde în cel mai scurt timp.</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume și Prenume</FormLabel>
                    <FormControl><Input placeholder="ex: Ion Popescu" aria-label="Nume și Prenume" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresă Email</FormLabel>
                      <FormControl><Input type="email" placeholder="ex: ion.popescu@email.com" aria-label="Adresă Email" {...field} /></FormControl>
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

                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mesajul tău</FormLabel>
                    <FormControl><Textarea rows={4} placeholder="Scrie mesajul tău aici..." aria-label="Mesajul tău" {...field} /></FormControl>
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
                      Trimite Mesajul
                    </>
                  )}
                </button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
