const mongoose = require("mongoose");

/**
 * Create new listing
 * @path {POST} /listing
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch created listing
*/
const createListing = (models) => {
    return async (req, res, next) => {
        try {
            // create a listing
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

/**
 * update listing for given listing id
 * @path {PUT} /listing/:id
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch updated listing
*/
const updateListing = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Listing Id missing")
            }
            // update a listing for given listing id
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

/**
 * get all listings
 * @path {GET} /listing
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch all the listings
*/
const getListings = (models) => {
    return async (req, res, next) => {
        try {
            // const pageNum = parseInt(req.query.pageNum) >= 1 ? parseInt(req.query.pageNum) : 1
            // const numListings = parseInt(req.query.numListings)
            // const offset = numListings * (pageNum - 1)
            return res.status(200).json({
                success: true,
                message: 'success',
                //data: await models.listing.find().skip(offset).limit(numListings).select({ __v: 0 })
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

/**
 * get listing for given listing id
 * @path {GET} /listing/:id
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch listing for given listing id
*/
const getListingById = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Listing Id missing")
            }
            // get a listing for given listing id
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

/**
 * get all listings that is posted by given landlord id
 * @path {GET} /listing/landlord/:landlordId
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch all listings that is posted by given landlord id
*/
const getListingByLandlordId = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.landlordId) {
                throw new Error("Landlord Id missing")
            }
            // get a listing for given landlord id
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

/**
 * delete listing for given listing id
 * @path {DELETE} /listing/:id
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data Successfully deleted
*/
const deleteListing = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Listing Id missing");
            }
            // get a listing for given listing id
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

/**
 * get all listings sorted by rating in descending order
 * @path {GET} /listing/recommendation
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch all listings sorted by rating in descending order
*/
const getListingByRating = (models) => {
    return async (req, res, next) => {
        try {
            // const pageNum = parseInt(req.query.pageNum) >= 1 ? parseInt(req.query.pageNum) : 1
            // const numListings = parseInt(req.query.numListings)
            // const offset = numListings * (pageNum - 1)
            return res.status(200).json({
                success: true,
                message: 'success',
                // data: await models.listing.find().sort('-rating').skip(offset).limit(numListings).select({ __v: 0 })
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

/**
 * get average rating and review count for all the listings that are of given landlord id
 * @path {GET} /listing/landlord/:landlordId/rating
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch average rating and review count for all the listings that are of given landlord id
*/
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
                      '$match': { // select the listings where landlordId equals req.params.landlordId
                        'landlordId': mongoose.Types.ObjectId(req.params.landlordId)
                      }
                    }, {  // excludes _id and includes listingId which is equals to _id
                      '$project': {
                        '_id': 0, 
                        'listingId': '$_id'
                      }
                    }, { // listing performs join with ratings where _id in listing equals listingId in rating collection
                      '$lookup': {
                        'from': 'ratings', 
                        'localField': 'listingId', 
                        'foreignField': 'listingId', 
                        'as': 'ratings'
                      }
                    }, { // outputs a new ratings for each document in ratings array
                      '$unwind': {
                        'path': '$ratings', 
                        'preserveNullAndEmptyArrays': true
                      }
                    }, {
                      '$group': { // Group documents by listing id
                        '_id': '$listingId', 
                        'averageRating': {
                          '$avg': '$ratings.rating'
                        }
                      }
                    }, { // excludes _id and includes averageRating and listingId which is equals to _id
                      '$project': {
                        '_id': 0, 
                        'listingId': '$_id', 
                        'averageRating': 1
                      }
                    }, {
                      '$lookup': { // listing performs join with comments where _id in listing equals listingId in comment collection
                        'from': 'comments', 
                        'localField': 'listingId', 
                        'foreignField': 'listingId', 
                        'as': 'comments'
                      }
                    }, {
                      '$project': { // includes averageRating, listingId and reviewCount which is equal to size of comments array
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

/**
 * get all listings depending on the search parameter
 * @path {GET} /listing/search
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch all listings depending on the search parameter
*/
const getListingBySearchParameter = (models) => {
    return async (req, res, next) => {
        try {
            const findQuery = {};

            // if postal code is in search query
            if("postalCode" in req.query) {
                findQuery["postalCode"] = {
                    $regex: new RegExp(`^${req.query.postalCode}`) // performs pattern matching with req.query.postalCode
                }
            }

            // if rent is in search query
            if("rent" in req.query) {
                findQuery["rent"] = {
                    $lt: parseInt(req.query.rent) // filter rent that is less than req.query.rent
                }
            }

            // if rating is in search query
            if("rating" in req.query) {
                findQuery["rating"] = parseInt(req.query.rating)
            }

            // if bedrooms is in search query
            if("bedrooms" in req.query) {
                findQuery["bedrooms"] = parseInt(req.query.bedrooms)
            }

            // if bathrooms is in search query
            if("bathrooms" in req.query) {
                findQuery["bathrooms"] = parseInt(req.query.bathrooms)
            }

            // if hasPet is in search query
            if("hasPet" in req.query) {
                findQuery["hasPet"] = req.query.hasPet === "true"
            }

            // const pageNum = parseInt(req.query.pageNum) >= 1 ? parseInt(req.query.pageNum) : 1
            // const numListings = parseInt(req.query.numListings)
            // const offset = numListings * (pageNum - 1)

            const pipeline = [
                { // listing performs join with ratings where _id in listing equals listingId in rating collection
                  '$lookup': {
                    'from': 'ratings', 
                    'localField': '_id', 
                    'foreignField': 'listingId', 
                    'as': 'ratings'
                  }
                }, {
                  '$set': { // include rating whose value is avaerage of ratings.rating if rating exists else 0
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
                }, { // exclude ratings
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
                // data: await models.listing.aggregate(pipeline).skip(offset).limit(numListings)
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