import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import CarDetails from "./pages/CarDetails";
import Financing from "./pages/Financing";
import CustomOrder from "./pages/CustomOrder";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/masini" element={<PageTransition><Inventory /></PageTransition>} />
        <Route path="/masini/:id" element={<PageTransition><CarDetails /></PageTransition>} />
        <Route path="/finantare" element={<PageTransition><Financing /></PageTransition>} />
        <Route path="/comanda" element={<PageTransition><CustomOrder /></PageTransition>} />
        <Route path="/servicii" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/termeni-si-conditii" element={<PageTransition><TermsAndConditions /></PageTransition>} />
        <Route path="/politica-de-confidentialitate" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/politica-de-cookies" element={<PageTransition><CookiePolicy /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        {/* This outer div provides the black 'gutter' through padding. It's a flex container to allow the child to grow. */}
        <div className="flex min-h-screen flex-col p-2 md:p-4">
          {/* This inner div has the app's content, background, and grows to fill the padded space. */}
          <div className="relative flex-1 rounded-xl bg-background overflow-hidden">
            <AnimatedRoutes />
            <Footer />
            <WhatsAppButton />
            <BottomNav />
            <CookieBanner />
          </div>
        </div>
        <div className="neon-frame" />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
