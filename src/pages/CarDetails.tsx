
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft, Calendar, Gauge, Fuel, Cog, Zap, Check,
  MessageCircle, Calculator, Shield, Truck, Award, AlertCircle,
  X, ChevronLeft, ChevronRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
} from "@/components/ui/carousel";
import { getListingById } from "@/services/api";
import { getAttribute } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import placeholderImg from "@/assets/car-sedan.jpg";

const sellingPoints = [
  { icon: Shield, title: "Garanție Inclusă", desc: "Fiecare mașină vine cu garanție." },
  { icon: Truck, title: "Livrare Națională", desc: "Transport pe platformă în toată țara." },
  { icon: Award, title: "Verificare Completă", desc: "Inspecție tehnică și istoricul complet." },
];

const CarDetailsSkeleton = () => (
    <div className="pb-24">
        <div className="relative h-72 sm:h-96 bg-muted/50"><Skeleton className="h-full w-full"/></div>
        <div className="section-padding pb-0">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Skeleton className="h-8 w-3/4"/>
                <Skeleton className="h-8 w-1/4"/>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({length: 6}).map((_, i) => (
                    <Skeleton key={i} className="h-[62px] w-full rounded-xl" />
                ))}
            </div>
            <div className="mt-8">
                 <Skeleton className="h-6 w-32 mb-4" />
                 <div className="flex flex-wrap gap-2">
                    {Array.from({length: 8}).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-24 rounded-full" />
                    ))}
                 </div>
            </div>
        </div>
    </div>
)

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListingById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (car) {
        const newTitle = `${car.title} | Nițu Auto Park`;
        document.title = newTitle;

        const metaDesc = car.description ? car.description.substring(0, 155) + '...' : 'Mașină premium disponibilă la Nițu Auto Park.';
        const metaImg = car.images.length > 0 ? car.images[0].url : '/logo.png';

        document.querySelector('meta[name="description"]')?.setAttribute('content', metaDesc);
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', newTitle);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', metaDesc);
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', metaImg);
        document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href);
        document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', newTitle);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metaDesc);
        document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', metaImg);
    }

    // Cleanup on unmount
    return () => {
        const defaultTitle = 'Nițu Auto Park | Mașini Rulate Premium';
        document.title = defaultTitle;

        const defaultDesc = 'Nițu Auto Park, dealer-ul tău de încredere pentru mașini rulate premium din Câmpina. Oferim finanțare, livrare națională și servicii complete.';
        const defaultImg = '/logo.png';

        document.querySelector('meta[name="description"]')?.setAttribute('content', defaultDesc);
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', defaultTitle);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', defaultDesc);
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', defaultImg);
        document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.origin);
        document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', defaultTitle);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', defaultDesc);
        document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', defaultImg);
    };
  }, [car]);

  const images = car?.images.length ? car.images : [{ url: placeholderImg, id: 'placeholder', order: 0 }];

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);
  
  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);
  
  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeLightbox();
        if (images.length > 1) {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        }
    };
    if (lightboxOpen) {
        window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, images.length, nextImage, prevImage, closeLightbox]);


  if (isLoading) {
    return <CarDetailsSkeleton />;
  }

  if (isError || !car) {
    return (
      <div className="section-padding flex min-h-[60vh] flex-col items-center justify-center pb-24 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <p className="mb-4 text-xl text-muted-foreground">Mașina nu a fost găsită sau a apărut o eroare.</p>
        <button onClick={() => navigate("/masini")} className="btn-gold rounded-full px-6 py-3 text-sm">
          Înapoi la Stoc
        </button>
      </div>
    );
  }

  const specs = [
    { icon: Calendar, label: "An", value: getAttribute(car, 'an') },
    { icon: Gauge, label: "Kilometraj", value: car.mileage ? `${car.mileage.toLocaleString("ro-RO")} km` : null },
    { icon: Fuel, label: "Combustibil", value: getAttribute(car, 'combustibil') },
    { icon: Cog, label: "Motor", value: getAttribute(car, 'capacitate cilindrica') ? `${getAttribute(car, 'capacitate cilindrica')} cmc` : null },
    { icon: Zap, label: "Putere", value: getAttribute(car, 'putere (cp)') || getAttribute(car, 'putere') ? `${getAttribute(car, 'putere (cp)') || getAttribute(car, 'putere')} CP` : null },
    { icon: Cog, label: "Transmisie", value: getAttribute(car, 'cutie de viteze') },
  ].filter(s => s.value);


  // Extract features from attributes, excluding main specs and empty values
  const mainSpecNames = ['an', 'kilometraj', 'combustibil', 'motor', 'putere', 'transmisie', 'price', 'pret', 'marca', 'model', 'capacitate cilindrica', 'cutie de viteze', 'putere (cp)'];
  const features = car.attributeValues
    .map(av => {
        if (mainSpecNames.includes(av.attribute.name.toLowerCase())) return null;
        if (av.booleanValue === true) return av.attribute.name;
        if (typeof av.stringValue === 'string' && av.stringValue.trim() !== '') return av.stringValue;
        return null;
    })
    .filter((v): v is string => v !== null);

  return (
    <div className="pb-24">
      {/* Back button */}
      <div className="fixed left-4 top-4 z-40">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card/80 backdrop-blur-lg border border-border/50 transition-transform active:scale-90"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ArrowLeft size={20} className="text-foreground" />
        </motion.button>
      </div>

      {/* Hero Carousel */}
      <div className="relative">
        <Carousel className="w-full" opts={{ loop: images.length > 1 }}>
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={img.id} onClick={() => openLightbox(index)} className="cursor-pointer">
                <div className="relative h-72 sm:h-96 overflow-hidden">
                  <img src={img.url} alt={`${car.title}`} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && <>
            <CarouselPrevious className="left-3 top-1/2 border-border/50 bg-card/60 backdrop-blur-sm text-foreground hover:bg-card" />
            <CarouselNext className="right-3 top-1/2 border-border/50 bg-card/60 backdrop-blur-sm text-foreground hover:bg-card" />
          </>}
        </Carousel>

        {/* Category badge */}
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-primary/20 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
            {car.category.name}
          </span>
        </div>
      </div>

      {/* Title & Price */}
      <div className="section-padding pb-0">
        <AnimatedSection>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold md:text-3xl">{car.title}</h1>
            {car.price && (
                <span className="text-2xl font-bold gold-gradient-text">{car.price.toLocaleString("ro-RO")} €</span>
            )}
          </div>
        </AnimatedSection>

        {/* Specs Grid */}
        {specs.length > 0 && <AnimatedSection delay={0.1}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-3 flex items-center gap-3">
                <s.icon size={18} className="gold-icon shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground">{s.label}</p>
                  <p className="text-sm font-semibold">{String(s.value)}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>}

        {/* Description & Features */}
        <AnimatedSection delay={0.2}>
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-bold">Descriere & Dotări</h2>
            <p className="text-muted-foreground text-sm mb-4 whitespace-pre-wrap">{car.description}</p>
            {features.length > 0 && <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  <Check size={12} className="text-primary" />
                  {f}
                </span>
              ))}
            </div>}
          </div>
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection delay={0.3}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate(`/finantare?suma=${car.price}`)}
              className="btn-gold flex-1 rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Calculator size={18} />
              Calculează Rata
            </button>
            <a
              href="https://wa.me/40700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold flex-1 rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Contactează Vânzătorul
            </a>
          </div>
        </AnimatedSection>

        {/* Why Choose Us */}
        <AnimatedSection delay={0.4}>
          <div className="mt-10">
            <h2 className="mb-4 text-lg font-bold">De Ce Noi?</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {sellingPoints.map((sp, i) => (
                <motion.div
                  key={sp.title}
                  className="glass-card-gold rounded-xl p-4 flex items-start gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <sp.icon size={22} className="gold-icon shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold">{sp.title}</h4>
                    <p className="text-xs text-muted-foreground">{sp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-[52] flex h-10 w-10 items-center justify-center rounded-full bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 active:scale-90"
            >
              <X size={24} className="gold-icon" />
            </motion.button>

            {/* Prev Button */}
            {images.length > 1 && <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 z-[52] -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 active:scale-90"
            >
              <ChevronLeft size={30} className="gold-icon" />
            </motion.button>}

            {/* Next Button */}
            {images.length > 1 && <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 z-[52] -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 active:scale-90"
            >
              <ChevronRight size={30} className="gold-icon" />
            </motion.button>}

            {/* Image */}
            <motion.div
              className="relative p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} mode="wait">
                  <motion.img
                      key={images[selectedIndex].id}
                      src={images[selectedIndex].url}
                      alt={car.title}
                      initial={{ opacity: 0.8, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-gold-lg"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.15}
                      onDragEnd={(_event, { offset, velocity }) => {
                        const swipePower = Math.abs(offset.x) * velocity.x;
                        if (swipePower < -10000) {
                          nextImage();
                        } else if (swipePower > 10000) {
                          prevImage();
                        }
                      }}
                  />
              </AnimatePresence>
            </motion.div>

            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, y: 10 }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/50 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
            >
              {selectedIndex + 1} / {images.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarDetails;
