const mongoose = require("mongoose");

/**
 * Add Rating
 * @path {POST} /rating
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch added rating
*/
const addRating = (models) => {
    return async (req, res, next) => {
        try {
            // add a new rating
            const rating = new models.rating(req.body);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await rating.save()
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// update rating for given rating id
/**
 * Add Rating
 * @path {PUT} /rating/:id
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch added rating
*/
const updateRating = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Rating Id missing")
            }
            // update a rating for given rating id
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.rating.findByIdAndUpdate(req.params.id, req.body, {new: true})
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
 * get rating given by user id for given listing id
 * @path {GET} /rating/user/:userId/listing/:listingId
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch rating given by user id for given listing id
*/
const getRatingByUserId = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.userId) {
                throw new Error("User Id  missing")
            }
            if(!req.params.listingId) {
                throw new Error("Listing Id missing")
            }
            // get ratings for given user id and listing id
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.rating.find({userId: req.params.userId, listingId: req.params.listingId}).select({ __v: 0 })
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
 * get average rating and review count for given listing id
 * @path {GET} /rating/listing/:listingId
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch average rating and review count for given listing id
*/
const getAverageRatingByListingId = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.listingId) {
                throw new Error("Listing Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.rating.aggregate([
                    {
                        '$group': { // Group documents by listing id
                            '_id': '$listingId', 
                            'averageRating': {
                                '$avg': '$rating'
                            }
                        }
                    }, {
                        '$project': { // exclude _id and includes averageRating and listingId whose value equals _id
                            '_id': 0, 
                            'listingId': '$_id', 
                            'averageRating': 1
                        }
                    }, {
                        '$lookup': { // ratings performs join with comments where listingId in ratings equals listingId in comments collection
                            'from': 'comments', 
                            'localField': 'listingId', 
                            'foreignField': 'listingId', 
                            'as': 'comments'
                        }
                    }, {
                        '$project': { // includes averageRating, listingId and reviewCount whose value equals size of comment array
                            'listingId': 1, 
                            'averageRating': 1, 
                            'reviewCount': {
                                '$size': '$comments'
                            }
                        }
                    }, {
                        '$match': { // select the ratings where parentId equals req.params.listingId
                            'listingId': mongoose.Types.ObjectId(req.params.listingId)
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


module.exports = {
    addRating,
    updateRating,
    getRatingByUserId,
    getAverageRatingByListingId
}