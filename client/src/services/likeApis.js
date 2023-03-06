import axios from "axios";

export async function like(like) {
    try {
        const { data } = await axios.post(`api/v1/like`, like);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function unlike(likeId) {
    try {
        const { data } = await axios.delete(`api/v1/like/${likeId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}