/*
 * Filename: landlordApis.js
 *
 * This file defines the set of axios (http) calls to landlord APIs.
 */

import axios from "axios";
import env from "../environment";
const BASE_URL = env.BASE_URL;

// Sends a POST request to the landlord API with the param `landlord` as the request body.
// If successful, creates a new valid landlord credential.
export async function createLandlord(landlord) {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/landlord`, landlord);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

// Sends a PUT request to the landlord API with the param `landlord` as the request body and `landId` in request params.
// If successful, persists updated landlord information in the database.
export async function updateLandlord(landlord, landlordId) {
    try {
        const { data } = await axios.put(`${BASE_URL}/api/v1/landlord/${landlordId}`, landlord);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}
// Sends a GET request to the landlord API with the given `landlordId` param as part of the request params.
// If successful, returns the profile information from the object corresponding to the landlordId
export async function getLandlordInfoById(landlordId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/landlord/${landlordId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

// Sends a GET request to the landlord API with the given `landlordId` param as part of the request params.
// If successful, returns the profile picture from the object corresponding to the landlordId
export async function getLandlordProfilePicById(landlordId) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/landlord/profilepic/${landlordId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}