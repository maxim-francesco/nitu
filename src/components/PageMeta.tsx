import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
}

const PageMeta = ({
  title,
  description,
  ogImage = "/logo.png",
  ogUrl = "https://www.nituautopark.ro",
  canonicalUrl = "https://www.nituautopark.ro",
}: PageMetaProps) => {
  useEffect(() => {
    // Helper to safely set meta tags
    const setMetaTag = (selector: string, attribute: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (selector.includes('name=')) {
          const nameMatch = selector.match(/name="([^"]+)"/);
          if (nameMatch) el.setAttribute("name", nameMatch[1]);
        } else if (selector.includes('property=')) {
          const propMatch = selector.match(/property="([^"]+)"/);
          if (propMatch) el.setAttribute("property", propMatch[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    const setLinkTag = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    document.title = title;

    setMetaTag('meta[name="description"]', "content", description);
    
    // Open Graph
    setMetaTag('meta[property="og:title"]', "content", title);
    setMetaTag('meta[property="og:description"]', "content", description);
    setMetaTag('meta[property="og:image"]', "content", ogImage);
    setMetaTag('meta[property="og:url"]', "content", ogUrl);

    // Twitter
    setMetaTag('meta[name="twitter:title"]', "content", title);
    setMetaTag('meta[name="twitter:description"]', "content", description);
    setMetaTag('meta[name="twitter:image"]', "content", ogImage);

    // Canonical URL
    setLinkTag("canonical", canonicalUrl);

  }, [title, description, ogImage, ogUrl, canonicalUrl]);

  return null;
};

export default PageMeta;
