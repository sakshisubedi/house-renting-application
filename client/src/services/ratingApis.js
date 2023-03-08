import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

export async function addRating(rating) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/rating`, rating);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function updateRating(ratingId, rating) {
    try {
        const { data } = await axios.put(`${BASE_URL}/api/v1/rating/${ratingId}`, rating);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getRatingByUserId(userId, listingId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/rating/user/${userId}/listing/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getAverageRatingByListingId(listingId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/rating/listing/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}