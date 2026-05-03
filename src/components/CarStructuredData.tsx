import type { Listing } from "@/types";

interface CarStructuredDataProps {
  car: Listing;
}

export const CarStructuredData = ({ car }: CarStructuredDataProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": car.title,
    "description": car.description || `${car.title} la Nițu Auto Park`,
    "image": car.images?.[0]?.url || "",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": car.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "Nițu Auto Park"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
