import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

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

export async function getCommentsByListingId(listingId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/comment/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}