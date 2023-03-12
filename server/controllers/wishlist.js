// Add a wishlist item
const createWishlistItem = (models) => {
    return async (req, res, next) => {
        try {
            const wishlistItem = new models.wishlist(req.body);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await wishlistItem.save()
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Get all wishlist items corresponding to a given user id
const getWishlistByUserId = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.wishlist.find({ userId: req.params.id }).select({ __v: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Get all users who have added a listing to their wishlist given a listing id
const getInterestedPeopleByListingId = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("Listing Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.wishlist.find({ listingId: req.params.id }).select({ __v: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Checks if a specified user id and listing id pair exist in the database, returns a boolean
const getIsWishlistedByUser = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.userId) {
                throw new Error("User id missing")
            }
            if (!req.params.listingId) {
                throw new Error("Listing id missing")
            }
            const item = await models.wishlist.find({ userId: req.params.userId, listingId: req.params.listingId })
            return res.status(200).json({
                success: true,
                message: 'success',
                data: item.length != 0 ? item[0] : false
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Delete a wishlist item by wishlist id
const deleteWishlistItem = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("Wishlist Id missing")
            }
            await models.wishlist.deleteOne({ _id: req.params.id })
            return res.status(200).json({
                success: true,
                message: 'success',
                data: "Successfully deleted"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}



module.exports = {
    createWishlistItem,
    getWishlistByUserId,
    getInterestedPeopleByListingId,
    getIsWishlistedByUser,
    deleteWishlistItem
}