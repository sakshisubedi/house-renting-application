/*
 * Filename: listingApi.js
 * 
 * This file defines axios (http) call to listing APIs
 */

import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

/**
 * Create new listing
 * @param {Object} listing listing object
 * @returns dreated listing if success else error
 */
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

/**
 * get all listings sorted by rating in descending order
 * @returns all listings sorted by rating in descending order if success else error
 */
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

/**
 * delete listing for given listing id
 * @param {string} listingId listing id
 * @returns successful deletion response if success else error
 */
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

/**
 * update listing for given listing id
 * @param {Object} listing listing object
 * @param {string} listingId listing id
 * @returns updated listing for given listing id if success else error
 */
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

/**
 * get listing for given listing id
 * @param {string} listingId listing id
 * @returns listing for given listing id if success else error
 */
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

/**
 * get all listings that is posted by given landlord id
 * @param {string} landlordId landlord id
 * @returns all listings if success else error
 */
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

/**
 * get average rating and review count for all the listings that are of given landlord id
 * @param {string} landlordId landlord id
 * @returns average rating and review count  if success else error
 */
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

/**
 * get all listings depending on the search parameter
 * @param {string} postalCode postal code
 * @param {string} rentPrice rent
 * @param {string} rating rating
 * @param {string} beds beds
 * @param {string} bathrooms bathrooms 
 * @param {string} petPref pet preference
 * @returns filtered listing  if success else error
 */
export async function getListingBySearchParameter(postalCode, rentPrice="", rating="", beds="", bathrooms="", petPref="") {
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
