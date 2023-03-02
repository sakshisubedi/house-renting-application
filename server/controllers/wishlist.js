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
                data: await models.wishlist.find({ userId: req.params.id })
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
    deleteWishlistItem
}