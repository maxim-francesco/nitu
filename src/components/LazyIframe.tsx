import { useState, useRef, useEffect, IframeHTMLAttributes, ReactNode } from "react";

interface LazyIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  placeholder?: ReactNode;
}

const LazyIframe = ({ placeholder, ...iframeProps }: LazyIframeProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" } // Încarcă puțin înainte să intre complet în ecran
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ minHeight: iframeProps.height || 250 }}>
      {shouldLoad ? (
        <iframe {...iframeProps} loading="lazy" />
      ) : (
        <div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card cursor-pointer border border-border/50"
          onClick={() => setShouldLoad(true)}
        >
          {placeholder ? placeholder : (
            <button 
              className="btn-gold rounded-full px-6 py-2 text-sm shadow-lg hover:scale-105 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                setShouldLoad(true);
              }}
            >
              Încarcă harta
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LazyIframe;
