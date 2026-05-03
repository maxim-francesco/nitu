import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Inventory = lazy(() => import("./pages/Inventory"));
const CarDetails = lazy(() => import("./pages/CarDetails"));
const Financing = lazy(() => import("./pages/Financing"));
const CustomOrder = lazy(() => import("./pages/CustomOrder"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
import BottomNav from "./components/BottomNav";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
import CookieBanner from "./components/CookieBanner";
import GoogleAnalytics from "./components/GoogleAnalytics";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const PageLoadingFallback = () => (
  <div className="min-h-screen bg-background" />
);

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

import { MotionConfig } from "framer-motion";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GoogleAnalytics measurementId="G-INLOCUIESTE_ACEST_ID" />
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <ScrollToTop />
          <div className="relative flex min-h-screen flex-col bg-background">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-card focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg">
              Sari la conținut principal
            </a>
            <main id="main-content" className="flex-1">
              <Suspense fallback={<PageLoadingFallback />}>
                <AnimatedRoutes />
              </Suspense>
            </main>
            <Footer />
            <WhatsAppButton />
            <BottomNav />
            <CookieBanner />
          </div>
          <div className="neon-frame" />
        </MotionConfig>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
