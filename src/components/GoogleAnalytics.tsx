import { useEffect } from "react";
import { CONSENT_CHANGED_EVENT, hasAnalyticsConsent } from "@/lib/consent";

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    const load = () => {
      // Fără ID setat, fără consimțământ pe analitică sau deja încărcat: nu facem nimic.
      if (!measurementId || measurementId === "G-INLOCUIESTE_ACEST_ID") return;
      if (!hasAnalyticsConsent()) return;
      if (document.getElementById("ga-script")) return;

      // 1. Creează și adaugă scriptul principal gtag.js
      const script = document.createElement("script");
      script.id = "ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      // 2. Adaugă scriptul de inițializare
      const initScript = document.createElement("script");
      initScript.id = "ga-init";
      initScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(initScript);
    };

    load();
    window.addEventListener(CONSENT_CHANGED_EVENT, load);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, load);

    /*
      INSTRUCȚIUNI DE CONFIGURARE GOOGLE ANALYTICS 4 (GA4):
      ======================================================
      PASUL 1: Creează un cont gratuit pe https://analytics.google.com
      PASUL 2: Creează o proprietate (Property) pentru "www.nituautopark.ro".
      PASUL 3: Configurează un Data Stream pentru platforma "Web".
      PASUL 4: Copiază "Measurement ID" (ID de măsurare), formatul "G-XXXXXXXXXX".
      PASUL 5: Modifică în App.tsx valoarea props-ului "measurementId".
      GA4 se încarcă doar după acceptarea categoriei „Analitică”.
    */
  }, [measurementId]);

  return null;
};

export default GoogleAnalytics;
