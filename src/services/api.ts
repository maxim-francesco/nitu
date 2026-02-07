import { API_BASE_URL, BUSINESS_ID } from "@/config/api";
import type { Listing, DetailedListing } from "@/types";

/**
 * Fetches a list of available car listings.
 * @param searchQuery Optional search query to filter by title/description.
 * @returns A promise that resolves to an array of listings.
 */
export const getListings = async (searchQuery: string = ""): Promise<Listing[]> => {
  const params = new URLSearchParams({
    businessId: BUSINESS_ID,
    limit: '100', // Fetch up to 100 listings
  });

  if (searchQuery) {
    params.append('q', searchQuery);
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
        console.error("Failed to fetch listing:", response.status, errorBody);
        throw new Error(`A eșuat preluarea detaliilor anunțului. Status: ${response.status}`);
    }
    const listing = await response.json();

    // The backend doesn't seem to enforce businessId on this public endpoint.
    // As a client-side safeguard, we'll check if the fetched listing belongs to the correct business.
    if (listing.businessId !== BUSINESS_ID) {
      throw new Error("Anunțul nu aparține acestui dealer.");
    }
    
    return listing;
};
