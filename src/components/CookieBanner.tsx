import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  OPEN_CONSENT_EVENT,
  consentNeeded,
  readConsent,
  saveConsent,
} from "@/lib/consent";
import { loadTikTokPixel, revokeTikTok } from "@/lib/tiktok";

type Mode = "summary" | "details";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("summary");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const open = useCallback((nextMode: Mode) => {
    const record = readConsent();
    setAnalytics(record?.analytics ?? false);
    setMarketing(record?.marketing ?? false);
    setMode(nextMode);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const record = readConsent();
    if (consentNeeded(record)) {
      setAnalytics(record?.analytics ?? false);
      setMarketing(record?.marketing ?? false);
      setIsVisible(true);
    }
    // A stored decision is the only reason to load TikTok; legacy values never qualify.
    if (record?.marketing === true) loadTikTokPixel();

    const onOpen = () => open("details");
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, [open]);

  useEffect(() => {
    if (!isVisible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Closing never stores a decision: the banner returns on the next load.
        setIsVisible(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => headingRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [isVisible]);

  const persist = (nextAnalytics: boolean, nextMarketing: boolean) => {
    saveConsent({ analytics: nextAnalytics, marketing: nextMarketing });
    if (nextMarketing) loadTikTokPixel();
    else revokeTikTok();
    setIsVisible(false);
    setMode("summary");
  };

  const acceptAll = () => persist(true, true);
  const rejectAll = () => persist(false, false);
  const savePreferences = () => persist(analytics, marketing);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4"
        >
          <div
            role="dialog"
            aria-modal="false"
            aria-labelledby="consent-title"
            aria-describedby="consent-description"
            className="glass-card-gold mx-auto max-w-4xl p-4 sm:p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2
                    id="consent-title"
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-sm font-semibold text-foreground outline-none"
                  >
                    Cookie-uri și consimțământ
                  </h2>
                  <p id="consent-description" className="mt-1 text-sm text-muted-foreground">
                    Folosim stocare strict necesară pentru funcționarea site-ului. Analitica și
                    marketingul (TikTok) sunt oprite până când le acceptați explicit. Puteți alege
                    doar categoriile dorite sau puteți refuza tot.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                aria-label="Închide fără a salva preferințele"
                title="Închide fără a salva preferințele"
                className="rounded-full p-1 text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {mode === "details" && (
              <div className="space-y-3 rounded-lg border border-border/60 p-3">
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    aria-describedby="necessary-desc"
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="font-medium text-foreground">Strict necesare (întotdeauna active)</span>
                    <span id="necessary-desc" className="block text-xs text-muted-foreground">
                      Memorează decizia de consimțământ. Nu pot fi dezactivate.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="font-medium text-foreground">Analitică</span>
                    <span className="block text-xs text-muted-foreground">
                      Statistici de utilizare. În prezent neconfigurată pe acest site.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="font-medium text-foreground">Marketing (TikTok Pixel)</span>
                    <span className="block text-xs text-muted-foreground">
                      Măsoară campaniile TikTok. Se încarcă doar dacă bifați această categorie.
                    </span>
                  </span>
                </label>
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <Link
                to="/politica-de-cookies"
                className="btn-outline-gold rounded-full px-5 py-2 text-center text-xs"
              >
                Politica de cookie-uri
              </Link>

              {mode === "summary" ? (
                <button
                  type="button"
                  onClick={() => setMode("details")}
                  className="btn-outline-gold rounded-full px-5 py-2 text-xs"
                >
                  Personalizează
                </button>
              ) : (
                <button
                  type="button"
                  onClick={savePreferences}
                  className="btn-outline-gold rounded-full px-5 py-2 text-xs"
                >
                  Salvează preferințele
                </button>
              )}

              <button
                type="button"
                onClick={rejectAll}
                className="btn-outline-gold rounded-full px-5 py-2 text-xs"
              >
                Refuză tot
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="btn-gold rounded-full border border-transparent px-5 py-2 text-xs"
              >
                Acceptă tot
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
