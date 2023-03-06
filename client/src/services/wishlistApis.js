import axios from "axios";

export async function createWishlistItem(wishlistItem) {
    try {
        const { data } = await axios.post(`api/v1/wishlist`, wishlistItem);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function getWishlistByUserId(userId) {
    try {
        const { data } = await axios.get(`api/v1/wishlist/${userId}}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}

export async function deleteWishlistItem(wishlistId) {
    try {
        const { data } = await axios.delete(`api/v1/wishlist/${wishlistId}`);
        return data;
    } catch (error) {
        return {
            error: error.message || error
        }
    }
}