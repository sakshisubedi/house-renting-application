import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

export async function createListing(listing) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/listing`, listing);
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function getListingsByRating() {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/listing/recommendation`
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function deleteListing(listingId) {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/v1/listing/${listingId}`
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function updateListing(listing, listingId) {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/api/v1/listing/${listingId}`,
      listing
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function getListingById(listingId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/listing/${listingId}`);
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function getListingByLandlordId(landlordId) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/listing/landlord/${landlordId}`
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function getListingRating(landlordId) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/listing/landlord/${landlordId}/rating`
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function getListingBySearchParameter(
  postalCode,
  rentPrice = "",
  rating = "",
  beds = "",
  bathrooms = "",
  petPref = ""
) {
  try {
    const searchParams = new URLSearchParams();
    if (postalCode !== "") {
      searchParams.append("postalCode", postalCode);
    }
    if (rentPrice !== "") {
      searchParams.append("rent", rentPrice.substring(1));
    }
    if (rating !== "") {
      searchParams.append("rating", rating);
    }
    if (beds !== "") {
      searchParams.append("bedrooms", beds);
    }
    if (bathrooms !== "") {
      searchParams.append("bathrooms", bathrooms);
    }
    if (petPref !== "") {
      searchParams.append("hasPet", petPref === "Yes");
    }
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/listing/search?${searchParams.toString()}`
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}
