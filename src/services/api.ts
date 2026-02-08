import { API_BASE_URL, BUSINESS_ID } from "@/config/api";
import type { Listing, DetailedListing, Filters, ContactFormData } from "@/types";

/**
 * Fetches a list of available car listings based on filters.
 * @param filters An object containing filter criteria.
 * @returns A promise that resolves to an array of listings.
 */
export const getListings = async (filters: Filters = {}): Promise<Listing[]> => {
  const params = new URLSearchParams({
    businessId: BUSINESS_ID,
    limit: "100",
  });

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else {
        params.append(key, String(value));
      }
    }
  }

  const response = await fetch(`${API_BASE_URL}/public/listings/search?${params.toString()}`);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Failed to fetch listings:", response.status, errorBody);
    throw new Error(`A eșuat preluarea anunțurilor. Status: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
};

/**
 * Fetches details for a single listing by its ID.
 * @param id The ID of the listing.
 * @returns A promise that resolves to the detailed listing object.
 */
export const getListingById = async (id: string): Promise<DetailedListing> => {
  const response = await fetch(`${API_BASE_URL}/public/listings/${id}`);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Failed to fetch listing ${id}:`, response.status, errorBody);
    throw new Error(`A eșuat preluarea anunțului. Status: ${response.status}`);
  }

  return await response.json();
};

/**
 * Submits the contact or custom order form.
 * @param data The form data.
 * @returns A promise that resolves to the server response.
 */
export const submitContactForm = async (data: ContactFormData): Promise<any> => {
  const payload = {
    ...data,
    businessId: BUSINESS_ID,
  };

  const response = await fetch(`${API_BASE_URL}/public/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: "A apărut o eroare la trimiterea formularului." }));
    console.error("Form submission error:", errorBody);
    throw new Error(errorBody.message || "A eșuat trimiterea formularului.");
  }

  return await response.json();
};
