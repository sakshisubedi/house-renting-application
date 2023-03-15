/*
 * Filename: userApis.js
 *
 * This file defines the set of axios (http) calls to user APIs.
 */

import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

// Sends a POST request to the user API with the param `user` as the request body.
// If successful, creates a new valid user credential.
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

// Sends a PUT request to the user API with the param `user` as the request body and `userId` in request params.
// If successful, persists updated user information in the database.
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

// Sends a GET request to the user API.
// If successful, returns all the users in the database.
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

// Sends a GET request to the user API with the given `userId` param as part of the request params.
// If successful, returns all of the information from the object corresponding to the userId
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

// Sends a GET request to the user API with the given `userId` param as part of the request params.
// If successful, returns only the public information from the object corresponding to the userId
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

// Sends a GET request to the user API with the given `userId` param as part of the request params.
// If successful, returns the profile picture from the object corresponding to the userId
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