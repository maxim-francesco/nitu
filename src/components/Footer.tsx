import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/40 pb-28 pt-12 section-padding">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-8 text-center">

        {/* Top Row: Logo & Description */}
        <div className="flex flex-col items-center gap-4">
          <Link to="/">
            <img src={logo} alt="Nițu Auto Park" className="h-16 w-auto" />
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
          <div className="flex items-center gap-6">
            <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" aria-label="Soluționarea Alternativă a Litigiilor">
              <img src="https://anpc.ro/wp-content/uploads/2022/07/SAL-PICTOGRAMA.png" alt="SAL" className="h-10 md:h-12 transition-transform hover:scale-105" />
            </a>
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" aria-label="Soluționarea Online a Litigiilor">
              <img src="https://anpc.ro/wp-content/uploads/2022/08/pictogramaSOL.png" alt="SOL" className="h-10 md:h-12 transition-transform hover:scale-105" />
            </a>
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
