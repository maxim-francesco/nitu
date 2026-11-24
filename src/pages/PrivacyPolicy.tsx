import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionTitle from "@/components/SectionTitle";

const PrivacyPolicy = () => {
    const business = {
        name: "LOUNGE QUEEN S CAFE SRL",
        cui: "38748301",
        regCom: "J2018000157299",
        address: "Str. Dealului nr. 84, Câmpina, Prahova, 105600",
        tradeName: "Nițu Auto Park",
        email: "andrei9940@yahoo.com",
        phone: "0745 461 202"
    };

    return (
        <div className="section-padding pb-24">
            <SectionTitle title="Politica de Confidențialitate" gold />
            <motion.div
                className="prose prose-invert mx-auto max-w-4xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="lead">
                    Confidențialitatea datelor dumneavoastră cu caracter personal reprezintă una dintre preocupările principale ale <strong>{business.name}</strong>, în calitate de operator de date.
                    Acest document are rolul de a vă informa cu privire la prelucrarea datelor dumneavoastră cu caracter personal, în contextul utilizării paginii de internet <strong>nituautopark.ro</strong>.
                </p>

                <h2 className="gold-gradient-text">1. Operatorul de Date</h2>
                <p>
                    Operatorul responsabil pentru prelucrarea datelor dumneavoastră este <strong>{business.name}</strong>, cu sediul în {business.address}, CUI {business.cui}, înregistrată la Registrul Comerțului sub nr. {business.regCom}.
                </p>
                <p>
                    Ne puteți contacta pentru orice întrebare legată de datele personale la adresa de e-mail <strong>{business.email}</strong> sau la numărul de telefon <strong>{business.phone}</strong>.
                </p>

                <h2 className="gold-gradient-text">2. Ce date prelucrăm</h2>
                <p>În funcție de modul în care utilizați site-ul, prelucrăm următoarele categorii de date:</p>
                <ul>
                    <li><strong>Date de contact:</strong> nume și prenume, adresă de e-mail, număr de telefon.</li>
                    <li><strong>Conținutul solicitării:</strong> mesajul transmis, vehiculul de interes, bugetul sau alte detalii pe care le furnizați voluntar în formularele de contact, comandă, finanțare sau buy-back.</li>
                    <li><strong>Date tehnice:</strong> adresa IP, tipul și versiunea browserului, dispozitivul, paginile accesate, momentul accesării și jurnalele tehnice ale serverului, necesare pentru funcționarea și securitatea site-ului.</li>
                    <li><strong>Date de urmărire (doar cu consimțământ):</strong> identificatori stocați în cookie-uri sau în stocarea browserului, evenimente de vizualizare și de conversie transmise către TikTok Pixel atunci când acceptați categoria „Marketing”.</li>
                </ul>
                <p>
                    Identificatorii tehnici (adresa IP, identificatorii din cookie-uri și evenimentele de urmărire) pot constitui date cu caracter personal atunci când permit, direct sau indirect, asocierea cu un utilizator sau cu un dispozitiv.
                </p>

                <h2 className="gold-gradient-text">3. Scopuri și temeiuri juridice</h2>
                <ul>
                    <li>
                        <strong>Răspunsul la întrebări generale</strong> trimise prin formularul de contact: temeiul este interesul nostru legitim de a comunica cu persoanele interesate (art. 6 alin. (1) lit. f GDPR). Ne puteți cere oricând să încetăm această prelucrare.
                    </li>
                    <li>
                        <strong>Cereri precontractuale</strong> (ofertă, comandă, finanțare, buy-back): temeiul este necesitatea de a lua măsuri la cererea dumneavoastră înainte de încheierea unui contract (art. 6 alin. (1) lit. b GDPR).
                    </li>
                    <li>
                        <strong>Funcționarea și securitatea site-ului</strong> (jurnale tehnice, protecție împotriva abuzurilor): interes legitim (art. 6 alin. (1) lit. f GDPR).
                    </li>
                    <li>
                        <strong>Comunicări comerciale prin e-mail</strong>, dacă vă abonați: consimțământ (art. 6 alin. (1) lit. a GDPR), care poate fi retras oricând.
                    </li>
                    <li>
                        <strong>Analitică web</strong>, dacă este activată: consimțământ (art. 6 alin. (1) lit. a GDPR). În prezent Google Analytics nu este configurat pe acest site.
                    </li>
                    <li>
                        <strong>Măsurarea campaniilor publicitare TikTok</strong>: consimțământ (art. 6 alin. (1) lit. a GDPR), acordat explicit prin categoria „Marketing” din bannerul de cookie-uri. Fără acest consimțământ, pixelul TikTok nu este încărcat și nu se transmite nicio dată către TikTok.
                    </li>
                    <li>
                        <strong>Obligații legale</strong> (de exemplu, documente fiscale și contabile): art. 6 alin. (1) lit. c GDPR.
                    </li>
                </ul>

                <h2 className="gold-gradient-text">4. Destinatari și împuterniciți</h2>
                <p>Datele pot fi accesate de următoarele categorii de destinatari, strict pentru scopurile de mai sus:</p>
                <ul>
                    <li><strong>TikTok Technology Limited</strong> (Irlanda) — pentru pixelul de marketing, exclusiv dacă acceptați categoria „Marketing”. Pentru colectarea și transmiterea evenimentelor pixelului și pentru raportarea de măsurare, TikTok și operatorul acestui site sunt <strong>operatori comuni</strong> (art. 26 GDPR), conform Termenilor specifici pe jurisdicții pentru SEE ai TikTok. Pentru crearea de audiențe și optimizarea reclamelor, fiecare parte acționează ca operator independent. <a href="https://www.tiktok.com/legal/page/eea/privacy-policy/en" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Politica de confidențialitate TikTok</a> explică prelucrările sale.</li>
                    <li><strong>Furnizori de hosting și infrastructură</strong> — Vercel Inc. (găzduirea site-ului) și Render Services, Inc. (serverul aplicației și baza de date), care prelucrează date tehnice și datele transmise prin formulare.</li>
                    <li><strong>Furnizor de livrare a imaginilor</strong> — Cloudflare, Inc. (worker-ul R2 care servește resursele media) poate înregistra adresa IP a vizitatorului.</li>
                    <li><strong>Instituții financiare</strong> — site-ul nu transmite automat date către finanțatori. Dacă solicitați o ofertă de finanțare, datele pot fi comunicate finanțatorului ales numai după ce vă exprimați acordul în acest sens.</li>
                    <li><strong>Autorități publice</strong> — atunci când există o obligație legală.</li>
                </ul>
                <p>
                    Nu vindem datele dumneavoastră și nu le transmitem altor terți în scopuri de marketing proprii ale acestora.
                </p>

                <h2 className="gold-gradient-text">5. Transferuri în afara Spațiului Economic European</h2>
                <p>
                    Unii dintre destinatari pot prelucra date în afara SEE. Pentru TikTok, transferurile către societăți din grup și către terți din state fără decizie de adecvare se realizează pe baza clauzelor contractuale standard, conform Termenilor specifici pe jurisdicții ai TikTok pentru SEE și politicii sale de confidențialitate.
                </p>
                <p>
                    Furnizorii de infrastructură sunt societăți cu sediul în Statele Unite și pot prelucra date în afara SEE. Termenii de prelucrare publicați de Vercel, Render și Cloudflare prevăd clauze contractuale standard pentru transferurile internaționale; detaliile despre mecanismul aplicabil se pot obține la cerere, la adresa de contact de mai sus.
                </p>

                <h2 className="gold-gradient-text">6. Cookie-uri și tehnologii de urmărire</h2>
                <p>
                    Site-ul folosește stocare strict necesară pentru funcționare (de exemplu, memorarea deciziei privind cookie-urile) și, numai cu consimțământul dumneavoastră, tehnologii de analiză și de marketing. TikTok Pixel se încarcă exclusiv după acceptarea categoriei „Marketing”.
                </p>
                <p>
                    Puteți refuza categoriile opționale fără a pierde accesul la site: conținutul, stocul de vehicule și formularele rămân disponibile. Lista completă a cookie-urilor, a furnizorilor și a duratelor este disponibilă în{" "}
                    <Link to="/politica-de-cookies" className="text-primary underline underline-offset-4">
                        Politica de cookies
                    </Link>.
                </p>

                <h2 className="gold-gradient-text">7. Cât timp păstrăm datele</h2>
                <ul>
                    <li><strong>Întrebări și cereri:</strong> pe durata soluționării solicitării; ulterior, doar dacă există o obligație legală de păstrare sau dacă este necesar pentru constatarea, exercitarea sau apărarea unui drept.</li>
                    <li><strong>Documente contractuale și fiscale:</strong> conform termenelor prevăzute de legislația aplicabilă.</li>
                    <li><strong>Decizia privind cookie-urile:</strong> până la retragerea consimțământului sau până la ștergerea datelor din browser.</li>
                    <li><strong>Cookie-uri de marketing TikTok:</strong> 13 luni de la ultima utilizare, conform documentației TikTok.</li>
                    <li><strong>Jurnale tehnice:</strong> pe o perioadă limitată, necesară pentru securitate și diagnosticarea erorilor.</li>
                </ul>

                <h2 className="gold-gradient-text">8. Drepturile dumneavoastră</h2>
                <p>În conformitate cu GDPR, beneficiați de următoarele drepturi:</p>
                <ul>
                    <li><strong>Dreptul la informare și acces:</strong> puteți solicita o confirmare a faptului că se prelucrează sau nu date cu caracter personal care vă privesc.</li>
                    <li><strong>Dreptul la rectificare:</strong> puteți solicita rectificarea datelor inexacte sau completarea datelor incomplete.</li>
                    <li><strong>Dreptul la ștergerea datelor („dreptul de a fi uitat”):</strong> puteți solicita ștergerea datelor, în cazul în care prelucrarea nu a fost legală sau în alte cazuri prevăzute de lege.</li>
                    <li><strong>Dreptul la restricționarea prelucrării:</strong> puteți solicita restricționarea prelucrării în cazurile prevăzute de lege.</li>
                    <li><strong>Dreptul la portabilitatea datelor:</strong> puteți primi datele într-un format structurat și le puteți transmite altui operator, pentru datele prelucrate în baza contractului sau a consimțământului.</li>
                    <li><strong>Dreptul la opoziție:</strong> vă puteți opune în orice moment prelucrărilor efectuate în scop de marketing direct sau în baza interesului legitim.</li>
                    <li><strong>Dreptul de a nu fi supus unei decizii individuale automate.</strong></li>
                    <li><strong>Dreptul de a vă adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong> — <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">www.dataprotection.ro</a> — sau instanțelor competente.</li>
                </ul>
                <p>
                    Pentru exercitarea acestor drepturi, vă puteți adresa cu o cerere scrisă, datată și semnată la adresa de e-mail: <strong>{business.email}</strong> sau la numărul de telefon: <strong>{business.phone}</strong>.
                </p>

                <h2 className="gold-gradient-text">9. Retragerea consimțământului</h2>
                <p>
                    Consimțământul pentru cookie-uri și pentru urmărirea de marketing poate fi modificat sau retras oricând din linkul <strong>„Setări cookies”</strong> din subsolul site-ului. La retragere, site-ul oprește încărcarea pixelului, șterge cookie-urile TikTok pe care le poate accesa pe domeniul propriu și solicită furnizorului să nu mai colecteze date.
                </p>
                <p>
                    Datele transmise către TikTok înainte de retragere nu pot fi șterse de site; pentru acestea puteți folosi setările de confidențialitate ale contului TikTok și ale browserului. Retragerea consimțământului nu afectează legalitatea prelucrării efectuate anterior.
                </p>

                <hr className="border-border"/>
                <p className="text-sm">
                    <em>Data ultimei actualizări: 24 noiembrie 2026</em>
                </p>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
