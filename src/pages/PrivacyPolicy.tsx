import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

const PrivacyPolicy = () => {
    const business = {
        name: "LOUNGE QUEEN S CAFE SRL",
        cui: "38748301",
        regCom: "J29/157/2018",
        address: "Bulevardul Nicolae Bălcescu, 105600, Câmpina, România",
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
                    Acest document are rolul de a vă informa cu privire la prelucrarea datelor dumneavoastră cu caracter personal, în contextul utilizării paginii de internet <strong>nitu-auto.ro</strong>.
                </p>

                <h2 className="gold-gradient-text">1. Operatorul de Date</h2>
                <p>
                    Operatorul responsabil pentru prelucrarea datelor dumneavoastră este <strong>{business.name}</strong>, cu sediul în {business.address}, CUI {business.cui}.
                </p>

                <h2 className="gold-gradient-text">2. Categoriile de Date cu Caracter Personal Prelucrate</h2>
                <p>
                    Colectăm date cu caracter personal direct de la dumneavoastră atunci când utilizați formularele de pe site-ul nostru (formular de contact, cerere de comandă, etc.). Datele pe care le prelucrăm includ:
                </p>
                <ul>
                    <li><strong>Nume și prenume</strong></li>
                    <li><strong>Adresă de e-mail</strong></li>
                    <li><strong>Număr de telefon</strong> (dacă este furnizat)</li>
                    <li><strong>Orice alte informații</strong> pe care le furnizați voluntar în secțiunile de mesaje sau detalii (de ex., preferințe auto, buget).</li>
                </ul>
                <p>
                    De asemenea, site-ul nostru poate colecta date în mod automat, cum ar fi adresa IP, browser-ul utilizat, și durata vizitei. Aceste date sunt folosite pentru mentenanță și îmbunătățirea serviciilor noastre și nu sunt utilizate pentru a vă identifica personal.
                </p>

                <h2 className="gold-gradient-text">3. Scopurile și Temeiurile Prelucrării</h2>
                <p>
                    Datele dumneavoastră cu caracter personal sunt prelucrate în următoarele scopuri:
                </p>
                <ul>
                    <li>
                        <strong>Pentru a răspunde solicitărilor dumneavoastră:</strong> Prelucrăm datele din formularele de contact sau de comandă pentru a vă putea contacta și a vă oferi informațiile sau serviciile solicitate. Temeiul juridic pentru această prelucrare este consimțământul dumneavoastră (Art. 6 alin. 1 lit. a din GDPR) și interesul nostru legitim de a desfășura activități comerciale (Art. 6 alin. 1 lit. f din GDPR).
                    </li>
                    <li>
                        <strong>Pentru activități de marketing:</strong> Doar cu consimțământul dumneavoastră, putem folosi adresa de e-mail pentru a vă trimite comunicări comerciale despre oferte noi sau servicii. Vă puteți retrage consimțământul oricând.
                    </li>
                </ul>

                <h2 className="gold-gradient-text">4. Durata Prelucrării</h2>
                <p>
                    Compania va prelucra datele dumneavoastră cu caracter personal atât cât este necesar pentru realizarea scopurilor de prelucrare menționate mai sus. În cazul în care sunteți un client, vom prelucra datele pe întreaga durată a raporturilor contractuale și ulterior, conform obligațiilor legale (de ex., în materie de arhivare).
                </p>

                <h2 className="gold-gradient-text">5. Drepturile Dumneavoastră</h2>
                <p>
                    În conformitate cu GDPR, beneficiați de următoarele drepturi:
                </p>
                <ul>
                    <li><strong>Dreptul la informare și acces:</strong> Puteți solicita o confirmare a faptului că se prelucrează sau nu date cu caracter personal care vă privesc.</li>
                    <li><strong>Dreptul la rectificare:</strong> Puteți solicita rectificarea datelor inexacte sau completarea datelor incomplete.</li>
                    <li><strong>Dreptul la ștergerea datelor ("dreptul de a fi uitat"):</strong> Puteți solicita ștergerea datelor, în cazul în care prelucrarea nu a fost legală sau în alte cazuri prevăzute de lege.</li>
                    <li><strong>Dreptul la restricționarea prelucrării:</strong> Puteți solicita restricționarea prelucrării în cazurile prevăzute de lege.</li>
                    <li><strong>Dreptul la portabilitatea datelor:</strong> Puteți primi datele într-un format structurat și le puteți transmite altui operator.</li>
                    <li><strong>Dreptul la opoziție:</strong> Vă puteți opune în orice moment prelucrărilor efectuate în scop de marketing direct.</li>
                    <li><strong>Dreptul de a nu fi supus unei decizii individuale automate.</strong></li>
                    <li><strong>Dreptul de a vă adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) sau instanțelor competente.</strong></li>
                </ul>

                <p>
                    Pentru exercitarea acestor drepturi, vă puteți adresa cu o cerere scrisă, datată și semnată la adresa de e-mail: <strong>{business.email}</strong> sau la numărul de telefon: <strong>{business.phone}</strong>.
                </p>
                
                <hr className="border-border"/>
                <p className="text-sm">
                    <em>Data ultimei actualizări: {new Date().toLocaleDateString('ro-RO')}</em>
                </p>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
