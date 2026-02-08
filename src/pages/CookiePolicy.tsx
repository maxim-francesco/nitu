import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

const CookiePolicy = () => {
    return (
        <div className="section-padding pb-24">
            <SectionTitle title="Politica de Cookies" gold />
            <motion.div
                className="prose prose-invert mx-auto max-w-4xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="lead">
                    Acest site web, nitu-auto.ro, utilizează cookie-uri pentru a îmbunătăți experiența utilizatorilor, pentru a asigura funcționalitatea site-ului și pentru a colecta date statistice.
                </p>

                <h2 className="gold-gradient-text">1. Ce sunt Cookie-urile?</h2>
                <p>
                    Un "cookie" este un fișier text de mici dimensiuni pe care un site îl salvează în calculatorul sau dispozitivul dumneavoastră mobil atunci când îl vizitați. Cookie-urile sunt utilizate pe scară largă pentru a face site-urile să funcționeze sau să funcționeze mai eficient, precum și pentru a furniza informații deținătorilor site-ului.
                </p>

                <h2 className="gold-gradient-text">2. Ce Tipuri de Cookie-uri Folosim?</h2>
                <p>
                    Folosim următoarele tipuri de cookie-uri:
                </p>
                <ul>
                    <li>
                        <strong>Cookie-uri Esențiale (Strict Necesare):</strong> Aceste cookie-uri sunt indispensabile pentru funcționarea corectă a site-ului. Ele vă permit să navigați pe site și să utilizați funcțiile sale de bază. Fără aceste cookie-uri, servicii precum reținerea consimțământului dumneavoastră nu pot fi furnizate.
                    </li>
                    <li>
                        <strong>Cookie-uri de Performanță și Analiză:</strong> Aceste cookie-uri ne ajută să înțelegem cum interacționează vizitatorii cu site-ul nostru, colectând informații în mod anonim. Folosim aceste date pentru a ne îmbunătăți constant site-ul. De exemplu, folosim Google Analytics pentru a monitoriza traficul pe site.
                    </li>
                    <li>
                        <strong>Cookie-uri de Funcționalitate:</strong> Acestea permit site-ului să rețină alegerile pe care le faceți (cum ar fi limba) și să ofere funcții îmbunătățite și mai personale.
                    </li>
                </ul>

                <h2 className="gold-gradient-text">3. Cum Puteți Controla Cookie-urile?</h2>
                <p>
                    Puteți controla și/sau șterge cookie-urile după cum doriți. Puteți șterge toate cookie-urile care sunt deja pe calculatorul dumneavoastră și puteți configura majoritatea browserelor pentru a preveni plasarea acestora. Totuși, dacă faceți acest lucru, este posibil să trebuiască să ajustați manual unele preferințe de fiecare dată când vizitați un site, iar unele servicii și funcționalități s-ar putea să nu funcționeze.
                </p>
                <p>
                    La prima vizită pe site-ul nostru, vi se va solicita consimțământul pentru utilizarea cookie-urilor non-esențiale printr-un banner.
                </p>

                <h2 className="gold-gradient-text">4. Contact</h2>
                <p>
                    Pentru orice întrebări legate de politica noastră de cookie-uri, ne puteți contacta la adresa de e-mail: <strong>andrei9940@yahoo.com</strong>.
                </p>
                
                <hr className="border-border"/>
                <p className="text-sm">
                    <em>Data ultimei actualizări: {new Date().toLocaleDateString('ro-RO')}</em>
                </p>
            </motion.div>
        </div>
    );
};

export default CookiePolicy;
