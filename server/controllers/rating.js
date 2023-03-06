const mongoose = require("mongoose");

// add rating
const addRating = (models) => {
    return async (req, res, next) => {
        try {
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
const updateRating = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Rating Id missing")
            }
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

// get rating given by user id for given listing id
const getRatingByUserId = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.userId) {
                throw new Error("User Id  missing")
            }
            if(!req.params.listingId) {
                throw new Error("Listing Id missing")
            }
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

// get average rating and review count for given listing id
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
                        '$group': {
                            '_id': '$listingId', 
                            'averageRating': {
                                '$avg': '$rating'
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
                    }, {
                        '$match': {
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