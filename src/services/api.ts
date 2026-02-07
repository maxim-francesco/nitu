import { API_BASE_URL, BUSINESS_ID } from "@/config/api";
import type { Listing, DetailedListing, Filters } from "@/types";

/**
 * Fetches a list of available car listings based on filters.
 * @param filters An object containing filter criteria.
 * @returns A promise that resolves to an array of listings.
 */
export const getListings = async (filters: Filters): Promise<Listing[]> => {
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
    const response = await fetch(`${API_...