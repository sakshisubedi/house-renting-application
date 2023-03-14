/*
 * Filename: ratingApi.js
 * 
 * This file defines axios (http) call to rating APIs
 */
import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

/**
 * Add Rating
 * @param {number} rating rating value between 1 to 5
 * @returns created rating object if success else error
 */
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

/**
 *  Update rating for given rating id
 * @param {string} ratingId rating id
 * @param {number} rating rating value between 1 to 5
 * @returns updated rating object if success else error
 */
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

/**
 * get rating given by user id for given listing id
 * @param {string} userId user id
 * @param {string} listingId listing id
 * @returns rating given by user id for given listing id if success else error
 */
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

/**
 * get average rating and review count for given listing id
 * @param {string} listingId Listing id
 * @returns average rating and review count for given listing id if success else error
 */
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