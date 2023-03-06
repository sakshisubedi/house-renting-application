import axios from "axios";

export async function createListing(listing) {
    try {
        const { data } = await axios.post(`api/v1/listing`, listing);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getListingsByRating() {
    try {
        const { data } = await axios.get(`api/v1/listing/recommendation`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function deleteListing(listingId) {
    try {
        const { data } = await axios.delete(`api/v1/listing/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function updateListing(listing, listingId) {
    try {
        const { data } = await axios.put(`api/v1/listing/${listingId}`, listing);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getListingById(listingId) {
    try {
        const { data } = await axios.get(`api/v1/listing/${listingId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getListingByLandlordId(landlordId) {
    try {
        const { data } = await axios.get(`api/v1/listing/landlord/${landlordId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getListingRating(landlordId) {
    try {
        const { data } = await axios.get(`api/v1/listing/landlord/${landlordId}/rating`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getListingBySearchParameter(postalCode) {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/listing/search?postalCode=${postalCode}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}
