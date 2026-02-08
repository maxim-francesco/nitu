import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const contactInfo = [
  { icon: MapPin, label: "Adresa", value: "Bulevardul Nicolae Bălcescu, 105600, Câmpina, România" },
  { icon: Phone, label: "Telefon", value: "0745 461 202" },
  { icon: Mail, label: "Email", value: "andrei9940@yahoo.com" },
  { icon: Clock, label: "Program", value: "Deschis Non-Stop" },
];

const Contact = () => (
  <div className="section-padding pb-24">
    <SectionTitle title="Contact & Locație" subtitle="Vino să ne cunoști" gold />

    {/* Map */}
    <motion.div
      className="mb-8 overflow-hidden rounded-2xl glass-card-gold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.7721034959973!2d25.744898199999994!3d45.1106876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b3ab680224cf41%3A0x60af4cb8f704c587!2sAuto-Park%20Ni%C8%9Bu!5e0!3m2!1sen!2sro!4v1770563591102!5m2!1sen!2sro"
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Locație Nițu Auto Park"
      />
    </motion.div>

    {/* Contact Info */}
    <div className="space-y-4">
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
);

export default Contact;
