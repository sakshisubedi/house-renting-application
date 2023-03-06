import axios from "axios";

export async function addComment(comment) {
    try {
        const { data } = await axios.post(`api/v1/comment`, comment);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function deleteComment(commentId) {
    try {
        const { data } = await axios.delete(`api/v1/comment/${commentId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getCommentsByListingId(listingId) {
    try {
        const { data } = await axios.get(`api/v1/comment/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}