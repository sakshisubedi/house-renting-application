import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

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