import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

export async function createUser(user) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/user`, user);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function updateUser(user, userId) {
    try {
        const { data } = await axios.put(`${BASE_URL}/api/v1/user/${userId}`, user);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getUsers() {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/user`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getUserAllInfoById(userId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/user/${userId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getUserPublicInfoById(userId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/user/public/${userId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getUserProfilePicById(userId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/user/profilepic/${userId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}