const mongoose = require("mongoose");

// add comment
const addComment = (models) => {
    return async (req, res, next) => {
        try {
            const comment = new models.comment(req.body);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await comment.save()
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// get all comments for given listing id
const getCommentsByListingId = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.listingId) {
                throw new Error("Listing Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.comment.aggregate([
                  {
                    '$lookup': {
                      'from': 'comments', 
                      'localField': '_id', 
                      'foreignField': 'parentId', 
                      'as': 'reply'
                    }
                  }, {
                    '$match': {
                      'parentId': null, 
                      'listingId': mongoose.Types.ObjectId(req.params.listingId)
                    }
                  }, {
                    '$unwind': {
                      'path': '$reply', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, {
                    '$lookup': {
                      'from': 'users', 
                      'localField': 'userId', 
                      'foreignField': '_id', 
                      'as': 'user'
                    }
                  }, {
                    '$unwind': {
                      'path': '$user', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, {
                    '$unset': 'userId'
                  }, {
                    '$lookup': {
                      'from': 'users', 
                      'localField': 'reply.userId', 
                      'foreignField': '_id', 
                      'as': 'reply.user'
                    }
                  }, {
                    '$unwind': {
                      'path': '$reply.user', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, {
                    '$unset': 'reply.userId'
                  }, {
                    '$lookup': {
                      'from': 'listings', 
                      'localField': 'listingId', 
                      'foreignField': '_id', 
                      'as': 'listing'
                    }
                  }, {
                    '$unwind': {
                      'path': '$listing', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, {
                    '$unset': 'listingId'
                  }, {
                    '$lookup': {
                      'from': 'listings', 
                      'localField': 'reply.listingId', 
                      'foreignField': '_id', 
                      'as': 'reply.listing'
                    }
                  }, {
                    '$unwind': {
                      'path': '$reply.listing', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, {
                    '$unset': 'reply.listingId'
                  }, {
                    '$group': {
                      '_id': '$_id', 
                      'reply': {
                        '$push': '$reply'
                      }, 
                      'parentId': {
                        '$first': '$parentId'
                      }, 
                      'comment': {
                        '$first': '$comment'
                      }, 
                      'timestamp': {
                        '$first': '$timestamp'
                      }, 
                      '__v': {
                        '$first': '$__v'
                      }, 
                      'user': {
                        '$first': '$user'
                      }, 
                      'listing': {
                        '$first': '$listing'
                      }, 
                      'media': {
                        '$first': '$media'
                      }
                    }
                  }
                ])
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}


// delete comment for given comment id
const deleteComment = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Comment Id missing");
            }
            await models.comment.deleteOne({_id: req.params.id});
            await models.comment.deleteMany({parentId: req.params.id});
            
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
    addComment,
    getCommentsByListingId,
    deleteComment
}