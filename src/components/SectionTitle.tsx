import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  gold?: boolean;
}

const SectionTitle = ({ title, subtitle, gold = false }: SectionTitleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-8 text-center"
  >
    <h2 className={`text-3xl font-bold md:text-4xl ${gold ? "gold-gradient-text" : ""}`}>
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
    )}
  </motion.div>
);

export default SectionTitle;
