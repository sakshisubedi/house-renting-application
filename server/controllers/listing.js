// create new listing
const createListing = (models) => {
    return async (req, res, next) => {
        try {
            const listing = new models.listing(req.body);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await listing.save()
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// update listing for given listing id
const updateListing = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Listing Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.listing.findByIdAndUpdate(req.params.id, req.body, {new: true})
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// get all listings
const getListing = (models) => {
    return async (req, res, next) => {
        try {
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.listing.find().select({ __v: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// get listing for given listing id
const getListingById = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Listing Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.listing.findById(req.params.id).select({ __v: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// get all listings that is posted by given landlord id
const getListingByLandlordId = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Listing Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.listing.find({landlordId: req.params.id}).select({ __v: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// delete listing for given listing id
const deleteListing = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Listing Id missing");
            }
            await models.listing.deleteOne({_id: req.params.id});
            // delete all wishlist for this listing
            await models.wishlist.deleteMany({listingId: req.params.id});
            // 
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
    createListing,
    updateListing,
    getListing,
    getListingById,
    getListingByLandlordId,
    deleteListing
}