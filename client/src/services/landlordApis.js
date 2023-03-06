import axios from "axios";

export async function createLandlord(landlord) {
    try {
        const { data } = await axios.post(`api/v1/landlord`, landlord);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function updateLandlord(landlord, landlordId) {
    try {
        const { data } = await axios.put(`api/v1/landlord/${landlordId}`, landlord);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getLandlordInfoById(landlordId) {
    try {
        const { data } = await axios.get(`api/v1/landlord/${landlordId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getLandlordProfilePicById(landlordId) {
    try {
        const { data } = await axios.get(`api/v1/landlord/profilepic/${landlordId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}