import { Link } from "react-router-dom";
import { openConsentSettings } from "@/lib/consent";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/40 pb-28 pt-12 section-padding">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-8 text-center">

        {/* Top Row: Logo & Description */}
        <div className="flex flex-col items-center gap-4">
          <Link to="/">
            {/* TODO: Convertește logo.png în WebP și adaugă-l în public/ pentru o performanță mai bună */}
            <picture>
              {/* <source srcSet="/logo.webp" type="image/webp" /> */}
              <img src={logo} alt="Logo Nițu Auto Park" width={200} height={100} loading="lazy" className="h-16 w-auto" />
            </picture>
          </Link>
          <p className="max-w-md text-sm text-muted-foreground">
            Dealer premium de mașini second-hand în Câmpina. Finanțare, livrare națională și servicii complete.
          </p>
        </div>

        {/* Middle Row: Nav & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Acasă</Link>
          <Link to="/masini" className="text-muted-foreground hover:text-primary transition-colors">Stoc</Link>
          <Link to="/finantare" className="text-muted-foreground hover:text-primary transition-colors">Finanțare</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          <span className="hidden sm:inline text-muted-foreground/30">|</span>
          <Link to="/termeni-si-conditii" className="text-muted-foreground hover:text-primary transition-colors">Termeni</Link>
          <Link to="/politica-de-confidentialitate" className="text-muted-foreground hover:text-primary transition-colors">Confidențialitate</Link>
        </div>

        {/* Separator */}
        <div className="w-full max-w-lg">
          <hr className="border-border/50" />
        </div>
        
        {/* Bottom Row: Legal Icons, Business Info, Credits */}
        <div className="flex flex-col items-center gap-6 text-xs text-muted-foreground/80">
          <div className="flex flex-col items-center gap-3">
            <a
              href="https://reclamatiisal.anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Soluționarea Alternativă a Litigiilor (SAL) – ANPC"
              className="inline-flex"
            >
              <img
                src="/assets/anpc-sal-250x50.png"
                alt="Soluționarea Alternativă a Litigiilor (SAL) – ANPC"
                width={250}
                height={50}
                loading="lazy"
                className="h-[50px] w-[250px] object-contain transition-transform hover:scale-105"
              />
            </a>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <a
                href="https://anpc.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                ANPC – Autoritatea Națională pentru Protecția Consumatorilor
              </a>
              <button
                type="button"
                onClick={openConsentSettings}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                Setări cookies
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Nițu Auto Park. Toate drepturile rezervate.</p>
            <p className="font-semibold">LOUNGE QUEEN S CAFE SRL | CUI: 38748301 | J29/157/2018</p>
          </div>
          <div>
            <p>
              Construit și proiectat de Francesco Maxim | <a href="tel:+40758990675" className="hover:text-primary transition-colors font-medium">+40 758 990 675</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
