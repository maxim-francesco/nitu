import { useEffect } from "react";

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    // Dacă nu avem ID setat sau nu suntem în producție, nu inițializăm GA4
    if (!measurementId || measurementId === "G-INLOCUIESTE_ACEST_ID") return;

    // Evităm adăugarea multiplă a scriptului dacă componenta se remontează
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

    /* 
      INSTRUCȚIUNI DE CONFIGURARE GOOGLE ANALYTICS 4 (GA4):
      ======================================================
      PASUL 1: Creează un cont gratuit pe https://analytics.google.com
      PASUL 2: Creează o proprietate (Property) pentru "www.nituautopark.ro".
      PASUL 3: Configurează un Data Stream pentru platforma "Web".
      PASUL 4: Copiază "Measurement ID" (ID de măsurare), care are formatul "G-XXXXXXXXXX".
      PASUL 5: Modifică în App.tsx valoarea props-ului "measurementId" la <GoogleAnalytics /> 
               cu ID-ul pe care tocmai l-ai copiat.
    */

  }, [measurementId]);

  return null;
};

export default GoogleAnalytics;
