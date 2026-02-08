import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";

const TermsAndConditions = () => {
    const business = {
        name: "LOUNGE QUEEN S CAFE SRL",
        cui: "38748301",
        regCom: "J29/157/2018",
        address: "Bulevardul Nicolae Bălcescu, 105600, Câmpina, România",
        tradeName: "Nițu Auto Park"
    };

    return (
        <div className="section-padding pb-24">
            <SectionTitle title="Termeni și Condiții" gold />
            <motion.div 
                className="prose prose-invert mx-auto max-w-4xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="lead">
                    Bun venit la {business.tradeName}. Prin utilizarea acestui site web ("Site-ul"), operat de 
                    <strong> {business.name}</strong>, sunteți de acord cu respectarea următorilor termeni și condiții. 
                    Vă rugăm să îi citiți cu atenție.
                </p>

                <h2 className="gold-gradient-text">1. Definiții</h2>
                <p>
                    <strong>Compania:</strong> {business.name}, cu sediul în {business.address}, înregistrată la Registrul Comerțului sub nr. {business.regCom}, CUI {business.cui}.<br/>
                    <strong>Site:</strong> Domeniul web nitu-auto.ro și subdomeniile acestuia.<br/>
                    <strong>Utilizator:</strong> Orice persoană fizică sau juridică care accesează și utilizează Site-ul.
                </p>
                
                <h2 className="gold-gradient-text">2. Proprietate Intelectuală</h2>
                <p>
                    Conținutul integral al acestui Site, incluzând, dar fără a se limita la, texte, imagini, grafică, logo-uri, și software, este proprietatea Companiei și este protejat de legislația română și internațională privind drepturile de autor. Utilizarea neautorizată a oricărui material constituie o încălcare a legii și va fi sancționată corespunzător.
                </p>

                <h2 className="gold-gradient-text">3. Acuratețea Descrierilor Autovehiculelor</h2>
                <p>
                    Compania depune toate eforturile rezonabile pentru a asigura acuratețea informațiilor prezentate pe Site (specificații tehnice, dotări, kilometraj, preț). Cu toate acestea, informațiile sunt oferite cu titlu informativ și pot conține erori accidentale sau omisiuni. Utilizatorii sunt încurajați să verifice direct la sediul nostru sau telefonic toate detaliile considerate esențiale înainte de a lua o decizie de cumpărare. Fotografiile autovehiculelor sunt cu titlu de prezentare și pot să nu reflecte cu exactitate toate detaliile.
                </p>

                <h2 className="gold-gradient-text">4. Politica de Prețuri</h2>
                <p>
                    Prețurile afișate pe Site sunt exprimate în Euro (EUR) și reprezintă prețul de vânzare final, dacă nu se specifică altfel. Compania își rezervă dreptul de a modifica prețurile afișate fără o notificare prealabilă. Orice modificare de preț nu va afecta o comandă deja confirmată.
                </p>
                
                <h2 className="gold-gradient-text">5. Limitarea Răspunderii</h2>
                <p>
                    Compania nu va fi răspunzătoare pentru niciun fel de daune directe, indirecte, accidentale sau speciale, rezultate din utilizarea sau incapacitatea de a utiliza acest Site sau din informațiile prezentate. Această limitare a răspunderii se aplică în măsura maximă permisă de lege. Compania nu garantează că Site-ul va funcționa neîntrerupt sau fără erori.
                </p>

                <h2 className="gold-gradient-text">6. Legea Aplicabilă și Jurisdicția</h2>
                <p>
                    Acești termeni și condiții sunt guvernați de legislația în vigoare din România. Orice dispută sau litigiu izvorât din utilizarea acestui Site va fi soluționat pe cale amiabilă. În cazul în care acest lucru nu este posibil, litigiul va fi înaintat spre soluționare instanțelor judecătorești competente din România.
                </p>
                
                <h2 className="gold-gradient-text">7. Modificări</h2>
                <p>
                    Compania își rezervă dreptul de a modifica oricând acești termeni și condiții. Versiunea actualizată va fi publicată pe Site și va intra în vigoare imediat. Continuarea utilizării Site-ului după publicarea modificărilor reprezintă acceptul tacit al Utilizatorului.
                </p>

                <hr className="border-border"/>
                <p className="text-sm">
                    <em>Data ultimei actualizări: {new Date().toLocaleDateString('ro-RO')}</em>
                </p>
            </motion.div>
        </div>
    );
};

export default TermsAndConditions;
