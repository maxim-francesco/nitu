import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type AnimationType = "fade-up" | "fade-in" | "slide-right" | "scale";

const variants: Record<AnimationType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  },
};

interface Props {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  duration?: number;
}

const AnimatedSection = ({ children, animation = "fade-up", delay = 0, className, duration = 0.6 }: Props) => (
  <motion.div
    variants={variants[animation]}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedSection;
