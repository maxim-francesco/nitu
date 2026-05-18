export interface Attribute {
  name: string;
  type: "STRING" | "NUMBER" | "BOOLEAN";
}

export interface AttributeValue {
  id: string;
  stringValue: string | null;
  numberValue: number | null;
  booleanValue: boolean | null;
  attribute: Attribute;
}

export interface ListingImage {
  id: string;
  url: string;
  order: number;
}

// Minimal listing for card views
export interface Listing {
  id: string;
  title: string;
  price: number | null;
  mileage: number | null;
  category: {
    name: string;
  };
  images: Array<{ url: string }>;
  attributeValues: AttributeValue[];
  youtubeVideoId?: string | null;
}

// Full listing for detail views
export interface DetailedListing extends Listing {
  description: string;
  businessId: string;
  images: ListingImage[];
}

export interface Filters {
  q?: string;
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'mileage_asc' | 'mileage_desc';
  limit?: number;
  Pret_min?: string;
  Pret_max?: string;
  Kilometraj_min?: string;
  Kilometraj_max?: string;
  Combustibil?: string[];
  [key: string]: any;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Helper function to safely extract an attribute value from a listing.
 * @param listing The listing object.
 * @param attributeName The case-insensitive name of the attribute to find.
 * @returns The value of the attribute, or null if not found.
 */
export const getAttribute = (
  listing: Listing | DetailedListing,
  attributeName: string
): string | number | boolean | null => {
  const attrValue = listing.attributeValues.find(
    (av) => av.attribute.name.toLowerCase() === attributeName.toLowerCase()
  );

  if (!attrValue) {
    return null;
  }

  switch (attrValue.attribute.type) {
    case "STRING":
      return attrValue.stringValue;
    case "NUMBER":
      return attrValue.numberValue;
    case "BOOLEAN":
      return attrValue.booleanValue;
    default:
      return null;
  }
};
