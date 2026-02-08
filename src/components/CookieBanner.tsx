import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "nitu_auto_cookie_consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="glass-card-gold mx-auto max-w-4xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                Folosim cookie-uri pentru a vă oferi cea mai bună experiență pe site-ul nostru.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/politica-de-cookies" className="btn-outline-gold rounded-full px-5 py-2 text-xs">
                Citește mai mult
              </Link>
              <button onClick={acceptCookies} className="btn-gold rounded-full px-5 py-2 text-xs">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
