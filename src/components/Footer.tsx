import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/40 pb-24 pt-10 section-padding">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-6 text-center">
        <img src={logo} alt="Nițu Auto Park" className="h-16 w-auto" />
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">LOUNGE QUEEN S CAFE SRL</p>
          <p>CUI: 38748301 | Reg. Com: J29/157/2018</p>
          <p>Bulevardul Nicolae Bălcescu, 105600, Câmpina, România</p>
        </div>
        <div className="text-xs text-muted-foreground/60">
            <p>© {new Date().getFullYear()} Nițu Auto Park. Toate drepturile rezervate.</p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <Link to="/termeni-si-conditii" className="hover:text-primary transition-colors">
                    Termeni și Condiții
                </Link>
                <span className="text-muted-foreground/30 hidden sm:inline">|</span>
                <Link to="/politica-de-confidentialitate" className="hover:text-primary transition-colors">
                    Politica de Confidențialitate
                </Link>
                <span className="text-muted-foreground/30 hidden sm:inline">|</span>
                <Link to="/politica-de-cookies" className="hover:text-primary transition-colors">
                    Politica de Cookies
                </Link>
            </div>
            <div className="mt-2 flex items-center justify-center gap-x-4">
                <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">
                    ANPC
                </a>
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">
                    SOL
                </a>
            </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
