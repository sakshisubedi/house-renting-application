// Add a wishlist item to the database. Saves a userId and listingID pair upon a user choosing to favorite a listing
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

// Get all wishlist items corresponding to a given user id. Used in displaying the set of listings wishlisted by a user
const getWishlistByUserId = (models) => {
    return async (req, res, next) => {
        try {
            // verify that a user id was given
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            // const pageNum = parseInt(req.query.pageNum) >= 1 ? parseInt(req.query.pageNum) : 1
            // const numListings = parseInt(req.query.numListings)
            // const offset = numListings * (pageNum - 1)

            // query the wishlist database for the set of all listings where the userId field matches the userId that was given
            return res.status(200).json({
                success: true,
                message: 'success',
                // data: await models.wishlist.find({ userId: req.params.id }).skip(offset).limit(numListings).select({ __v: 0 })
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
// TODO: pagination
const getInterestedPeopleByListingId = (models) => {
    return async (req, res, next) => {
        try {
            // verify that a user id was given
            if (!req.params.id) {
                throw new Error("Listing Id missing")
            }
            // // const pageNum = parseInt(req.query.pageNum) >= 1 ? parseInt(req.query.pageNum) : 1
            // const numPeople = parseInt(req.query.numPeople)
            // const offset = numPeople * (pageNum - 1)

            // query the wishlist database for the set of all users where the listingId field matches the listingId that was given
            return res.status(200).json({
                success: true,
                message: 'success',
                // data: await models.wishlist.find({ listingId: req.params.id }).skip(offset).limit(numPeople).select({ __v: 0 })
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

// Checks if a specified user id and listing id pair exist in the database, returns the item if exists, false if not. 
// Used to determine if a listing's heart icon should be filled in on a user's screen or not
const getIsWishlistedByUser = (models) => {
    return async (req, res, next) => {
        try {
            // verify that a user id was given
            if (!req.params.userId) {
                throw new Error("User id missing")
            }
            // verify that a listing id was given
            if (!req.params.listingId) {
                throw new Error("Listing id missing")
            }
            // query the database for a specific userId, listingId pair. if it exists, return the item, if not return false
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

// Delete a wishlist item corresponding to a given wishlist id
const deleteWishlistItem = (models) => {
    return async (req, res, next) => {
        try {
            // verify that a wishlist id was given
            if (!req.params.id) {
                throw new Error("Wishlist Id missing")
            }
            // delete the wishlist item corresponding to the given id, if successful, returns a string to inform the user of the success
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