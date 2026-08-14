import { API_BASE_URL, BUSINESS_ID } from "@/config/api";
import type { Listing, DetailedListing, Filters, ContactFormData } from "@/types";

export class ApiError extends Error {
  constructor(public message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Cererea a depășit timpul limită (5 secunde).');
    }
    throw error instanceof Error ? new ApiError(error.message) : new ApiError('Eroare necunoscută');
  }
};

/**
 * Fetches a list of available car listings based on filters.
 * @param filters An object containing filter criteria.
 * @returns A promise that resolves to an array of listings.
 */
export const getListings = async (filters: Filters = {}): Promise<Listing[]> => {
  const queryParams = {
    businessId: BUSINESS_ID,
    limit: "100",
    ...filters,
  };

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(queryParams)) {
    // We only want to append defined, non-null, and non-empty values
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else {
        params.append(key, String(value));
      }
    }
  }

  const response = await fetchWithTimeout(`${API_BASE_URL}/public/listings/search?${params.toString()}`);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Failed to fetch listings:", response.status, errorBody);
    throw new ApiError(`A eșuat preluarea anunțurilor. Status: ${response.status}`, response.status);
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
  const response = await fetchWithTimeout(`${API_BASE_URL}/public/listings/${id}`);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Failed to fetch listing ${id}:`, response.status, errorBody);
    throw new ApiError(`A eșuat preluarea anunțului. Status: ${response.status}`, response.status);
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
    type: data.type || "GENERAL",
    ...data,
    businessId: BUSINESS_ID,
  };

  const response = await fetchWithTimeout(`${API_BASE_URL}/public/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: "A apărut o eroare la trimiterea formularului." }));
    console.error("Form submission error:", errorBody);
    throw new ApiError(errorBody.message || "A eșuat trimiterea formularului.", response.status);
  }

  return await response.json();
};

/**
 * Submits a customer review.
 * @param data The review data.
 * @returns A promise that resolves to the server response.
 */
export const submitReview = async (data: { name: string; rating: number; text: string; comment?: string }): Promise<any> => {
  const payload = {
    ...data,
    comment: data.comment || data.text,
    businessId: BUSINESS_ID,
  };

  const response = await fetchWithTimeout(`${API_BASE_URL}/public/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: "A apărut o eroare la trimiterea recenziei." }));
    console.error("Review submission error:", errorBody);
    throw new ApiError(errorBody.message || "A eșuat trimiterea recenziei.", response.status);
  }

  return await response.json();
};

