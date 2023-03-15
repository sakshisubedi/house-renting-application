/*
 * Filename: commentApi.js
 * 
 * This file defines axios (http) call to comment APIs
 */

import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

/**
 * add comment
 * @param {Object} comment comment object which includes comment text, parent id, listing id, user id
 * @returns added comment if success else error
 */
export async function addComment(comment) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/comment`, comment);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

/**
 * delete comment for given comment id
 * @param {string} commentId comment id
 * @returns deleting text if success else error
 */
export async function deleteComment(commentId) {
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/comment/${commentId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

/**
 * get all comments for given listing id
 * @param {string} listingId listing id
 * @returns all comments for given listing id if success else error
 */
export async function getCommentsByListingId(listingId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/comment/listing/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}