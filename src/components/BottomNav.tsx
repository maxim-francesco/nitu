import { useLocation, useNavigate } from "react-router-dom";
import { Home, Car, Wallet, ClipboardList, Wrench, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", icon: Home, label: "Acasă" },
  { path: "/masini", icon: Car, label: "Stoc" },
  { path: "/finantare", icon: Wallet, label: "Rate" },
  { path: "/comanda", icon: ClipboardList, label: "Comandă" },
  { path: "/servicii", icon: Wrench, label: "Servicii" },
  { path: "/contact", icon: MapPin, label: "Contact" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe" role="navigation" aria-label="Navigație principală">
      <div className="mx-2 mb-2 rounded-2xl glass-card border-gold/20 border px-1 py-1">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                aria-label={`Mergi la pagina ${item.label}`}
                className="relative flex flex-col items-center gap-0.5 px-2 py-2 transition-transform active:scale-90"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <item.icon
                    size={20}
                    className={isActive ? "gold-icon" : "text-muted-foreground"}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </motion.div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
