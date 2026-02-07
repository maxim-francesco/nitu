import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/40 pb-24 pt-10 section-padding">
    <div className="container mx-auto">
      <div className="flex flex-col items-center gap-6 text-center">
        <img src={logo} alt="Nițu Auto Park" className="h-16 w-auto" />
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">LOUNGE QUEEN'S CAFE S.R.L.</p>
          <p>CUI: 38748301 | Reg. Com: J29/157/26.01.2018</p>
          <p>Strada DEALULUI, Nr. 84, Câmpina, Prahova</p>
        </div>
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Nițu Auto Park. Toate drepturile rezervate.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
