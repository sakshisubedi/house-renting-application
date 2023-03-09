import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

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

export async function getWishlistByUserId(userId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/wishlist/${userId}`);
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function getInterestedPeopleByListingId(listingId) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/wishlist/interested/${listingId}`
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

export async function getIsWishlistedByUser(userId, listingId) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/wishlist/user/${userId}/listing/${listingId}`
    );
    return data;
  } catch (error) {
    return {
      error: error.message || error,
    };
  }
}

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
