const mongoose = require("mongoose");

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
const getListings = (models) => {
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
            if(!req.params.landlordId) {
                throw new Error("Landlord Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.listing.find({landlordId: req.params.landlordId}).select({ __v: 0 })
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

// get all listings sorted by rating in descending order
const getListingByRating = (models) => {
    return async (req, res, next) => {
        try {
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.listing.find().sort('-rating').select({ __v: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// get average rating and review count for all the listings that are of given landlord id
const getAverageRatingForAllListingByLandlordId = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.landlordId) {
                throw new Error("Listing Id missing");
            }
            return res.status(200).json({
                success: true,
                message: "success",
                data: await models.listing.aggregate([
                    {
                      '$match': {
                        'landlordId': mongoose.Types.ObjectId(req.params.landlordId)
                      }
                    }, {
                      '$project': {
                        '_id': 0, 
                        'listingId': '$_id'
                      }
                    }, {
                      '$lookup': {
                        'from': 'ratings', 
                        'localField': 'listingId', 
                        'foreignField': 'listingId', 
                        'as': 'ratings'
                      }
                    }, {
                      '$unwind': {
                        'path': '$ratings', 
                        'preserveNullAndEmptyArrays': true
                      }
                    }, {
                      '$group': {
                        '_id': '$listingId', 
                        'averageRating': {
                          '$avg': '$ratings.rating'
                        }
                      }
                    }, {
                      '$project': {
                        '_id': 0, 
                        'listingId': '$_id', 
                        'averageRating': 1
                      }
                    }, {
                      '$lookup': {
                        'from': 'comments', 
                        'localField': 'listingId', 
                        'foreignField': 'listingId', 
                        'as': 'comments'
                      }
                    }, {
                      '$project': {
                        'listingId': 1, 
                        'averageRating': 1, 
                        'reviewCount': {
                          '$size': '$comments'
                        }
                      }
                    }
                ])
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

// get all listings depending on the search parameter
const getListingBySearchParameter = (models) => {
    return async (req, res, next) => {
        try {
            const findQuery = {};

            if("postalCode" in req.query) {
                findQuery["postalCode"] = {
                    $regex: new RegExp(`^${req.query.postalCode}`)
                }
            }

            if("rent" in req.query) {
                findQuery["rent"] = {
                    $lt: parseInt(req.query.rent)
                }
            }

            if("rating" in req.query) {
                findQuery["rating"] = parseInt(req.query.rating)
            }

            if("bedrooms" in req.query) {
                findQuery["bedrooms"] = parseInt(req.query.bedrooms)
            }

            if("bathrooms" in req.query) {
                findQuery["bathrooms"] = parseInt(req.query.bathrooms)
            }

            if("hasPet" in req.query) {
                findQuery["hasPet"] = req.query.hasPet === "true"
            }

            const pipeline = [
                {
                  '$lookup': {
                    'from': 'ratings', 
                    'localField': '_id', 
                    'foreignField': 'listingId', 
                    'as': 'ratings'
                  }
                }, {
                  '$set': {
                    'rating': {
                      '$ceil': {
                        '$ifNull': [
                          {
                            '$avg': '$ratings.rating'
                          }, 0
                        ]
                      }
                    }
                  }
                }, {
                  '$unset': 'ratings'
                }
            ];
            
            if(Object.keys(findQuery).length > 0) {
                pipeline.push({
                    $match: findQuery
                })
            }

            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.listing.aggregate(pipeline)
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
    getListings,
    getListingById,
    getListingByLandlordId,
    deleteListing,
    getListingByRating,
    getAverageRatingForAllListingByLandlordId,
    getListingBySearchParameter
}