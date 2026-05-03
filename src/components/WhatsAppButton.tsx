import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/40745461202"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-gold-lg transition-transform active:scale-90"
    style={{ background: "#25D366" }}
    aria-label="Contactează-ne pe WhatsApp"
  >
    <MessageCircle size={26} className="text-primary-foreground" fill="white" stroke="white" />
  </a>
);

export default WhatsAppButton;
