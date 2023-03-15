/*
 * Filename: wishlistApis.js
 *
 * This file defines the set of axios (http) calls to wishlist APIs.
 */

import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

// Sends a POST request to the wishlist API with the param `wishlistItem` as the request body.
// If successful, creates a new wishlist item defined as a pair (userId, listingId).
export async function createWishlistItem(wishlistItem) {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/wishlist`,
      wishlistItem
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

// Sends a GET request to the wishlist API with the param `userId` as part of the request params.
// If successful, returns an array of all the wishlist items that match this userId, i.e. the user's wishlist
export async function getWishlistByUserId(userId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/wishlist/${userId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

// Sends a GET request to the wishlist API with the param `listingId` as part of the request params.
// If successful, returns an array of all the wishlist items that match this listingId, i.e. the set of interested people for this particular listing
export async function getInterestedPeopleByListingId(listingId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/wishlist/interested/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

// Sends a GET request to the wishlist API with the params `userId` and `listingId` as part of the request params.
// If successful, returns the wishlist item if an item that matches the given userId and listingId exists, else returns false.
export async function getIsWishlistedByUser(userId, listingId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/wishlist/user/${userId}/listing/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

// Sends a DELETE request to the wishlist API with the param `wishlistId` as part of the request params.
// If successful, will remove the corresponding wishlist item from the database and return a string "Successfully deleted."
export async function deleteWishlistItem(wishlistId) {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/v1/wishlist/${wishlistId}`
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}
