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
                    Acest site web, nituautopark.ro, folosește stocare locală strict necesară pentru
                    funcționare și, numai cu acordul dumneavoastră, tehnologii de analiză și de
                    marketing. Operatorul site-ului este LOUNGE QUEEN S CAFE SRL, CUI 38748301,
                    J29/157/2018.
                </p>

                <h2 className="gold-gradient-text">1. Ce sunt cookie-urile și stocarea locală?</h2>
                <p>
                    Cookie-urile sunt fișiere text de mici dimensiuni salvate în browserul
                    dumneavoastră. Stocarea locală (localStorage) funcționează similar, dar datele
                    nu sunt trimise automat către server la fiecare cerere. Le folosim pentru a
                    reține decizia dumneavoastră privind cookie-urile și, dacă acceptați, pentru
                    măsurarea campaniilor.
                </p>

                <h2 className="gold-gradient-text">2. Ce categorii folosim</h2>
                <ul>
                    <li>
                        <strong>Strict necesare</strong> — rețin decizia de consimțământ. Sunt active
                        întotdeauna, nu pot fi dezactivate și nu presupun urmărire.
                    </li>
                    <li>
                        <strong>Analitice</strong> — statistici de utilizare. <em>În prezent Google
                        Analytics nu este configurat pe acest site</em> (identificatorul de măsurare
                        este un substituent). Dacă va fi activat, se va încărca doar după acceptarea
                        acestei categorii.
                    </li>
                    <li>
                        <strong>Marketing</strong> — TikTok Pixel, folosit pentru măsurarea
                        campaniilor publicitare TikTok. Se încarcă exclusiv după acceptarea explicită
                        a categoriei „Marketing”.
                    </li>
                </ul>

                <h2 className="gold-gradient-text">3. Tehnologii efectiv folosite</h2>
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Nume</th>
                                <th>Furnizor</th>
                                <th>Scop</th>
                                <th>Durată</th>
                                <th>Categorie</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>nitu_consent_v2</code> (localStorage)</td>
                                <td>nituautopark.ro</td>
                                <td>Memorează decizia privind cookie-urile (categorii, versiune, moment)</td>
                                <td>Până la ștergerea datelor din browser</td>
                                <td>Strict necesar</td>
                            </tr>
                            <tr>
                                <td><code>_ttp</code></td>
                                <td>TikTok</td>
                                <td>Măsurarea și îmbunătățirea performanței campaniilor publicitare</td>
                                <td>13 luni de la ultima utilizare</td>
                                <td>Marketing</td>
                            </tr>
                            <tr>
                                <td><code>_tt_enable_cookie</code></td>
                                <td>TikTok</td>
                                <td>Reține dacă pixelul TikTok poate folosi cookie-uri în acest browser</td>
                                <td>13 luni de la ultima utilizare</td>
                                <td>Marketing</td>
                            </tr>
                            <tr>
                                <td><code>ttcsid</code>, <code>ttcsid_D9H6IR3C77U0DKSMFMPG</code></td>
                                <td>TikTok</td>
                                <td>Măsoară performanța campaniilor TikTok; câte un cookie per cod de pixel</td>
                                <td>13 luni de la ultima utilizare</td>
                                <td>Marketing</td>
                            </tr>
                            <tr>
                                <td><code>ttclid</code></td>
                                <td>TikTok</td>
                                <td>Reține identificatorul de click TikTok din URL-ul de intrare</td>
                                <td>13 luni de la ultima utilizare</td>
                                <td>Marketing</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-sm">
                    Duratele pentru cookie-urile TikTok provin din documentația oficială TikTok for
                    Business („About using cookies with TikTok Pixel”), consultată la 23 noiembrie
                    2026. TikTok poate seta și cookie-uri terțe pe domeniul său (de exemplu{" "}
                    <code>_ttp</code> pe <code>.tiktok.com</code>), pe care site-ul nostru nu le
                    poate șterge.
                </p>

                <h2 className="gold-gradient-text">4. Cum vă dați și cum vă retrageți consimțământul</h2>
                <p>
                    La prima vizită, bannerul vă permite să acceptați tot, să refuzați tot sau să
                    alegeți individual categoriile. Închiderea bannerului fără o alegere nu
                    reprezintă consimțământ: tehnologiile de marketing rămân oprite.
                </p>
                <p>
                    În orice moment puteți redeschide panoul din linkul <strong>„Setări cookies”</strong>{" "}
                    din subsolul site-ului și puteți modifica sau retrage acordul. La retragere,
                    site-ul șterge cookie-urile TikTok pe care le poate accesa pe domeniul propriu și
                    solicită pixelului să nu mai colecteze date. Datele deja transmise către TikTok
                    înainte de retragere nu pot fi șterse de site; pentru acestea puteți folosi
                    setările de confidențialitate ale contului TikTok și ale browserului.
                </p>

                <h2 className="gold-gradient-text">5. Controlul din browser</h2>
                <p>
                    Puteți șterge sau bloca cookie-urile din setările browserului. Blocarea
                    cookie-urilor strict necesare va face ca bannerul să reapară la fiecare vizită,
                    deoarece site-ul nu poate reține decizia dumneavoastră.
                </p>

                <h2 className="gold-gradient-text">6. Contact</h2>
                <p>
                    Pentru întrebări despre această politică ne puteți scrie la{" "}
                    <strong>andrei9940@yahoo.com</strong>.
                </p>

                <hr className="border-border"/>
                <p className="text-sm">
                    <em>Data ultimei actualizări: 23 noiembrie 2026</em>
                </p>
            </motion.div>
        </div>
    );
};

export default CookiePolicy;
