/*
 * Filename: likeApi.js
 * 
 * This file defines axios (http) call to like APIs
 */
import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

/**
 * adds like
 * @param {Object} like like object that includes user id, comment id
 * @returns added like object if success else error
 */
export async function like(like) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/like`, like);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

/**
 * delete like for given like id
 * @param {string} likeId like id
 * @returns deletion successful response if success else error
 */
export async function unlike(likeId) {
    try {
        const { data } = await axios.delete(`${BASE_URL}/api/v1/like/${likeId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}