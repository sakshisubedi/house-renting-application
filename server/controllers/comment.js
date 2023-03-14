const mongoose = require("mongoose");

/**
 * adds comment
 * @path {POST} /comment
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch added comment
*/
const addComment = (models) => {
    return async (req, res, next) => {
        try {
            // create a comment
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

/**
 * get all comments for given listing id
 * @path {GET} /comment/listing/:listingId
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch all comments for given listing id
*/
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
                  { // comment performs self-join where parentId equals comment id in comment collection
                    '$lookup': {
                      'from': 'comments', 
                      'localField': '_id', 
                      'foreignField': 'parentId', 
                      'as': 'reply'
                    }
                  }, { // select the comments where parentId equals null
                    '$match': {
                      'parentId': null, 
                      'listingId': mongoose.Types.ObjectId(req.params.listingId)
                    }
                  }, { // outputs a new reply for each document in reply array
                    '$unwind': {
                      'path': '$reply', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, { // comment performs join with user where userId in comment equals user id in user collection
                    '$lookup': {
                      'from': 'users', 
                      'localField': 'userId', 
                      'foreignField': '_id', 
                      'as': 'user'
                    }
                  }, { 
                    '$unwind': {  // outputs a new user for each document in user array
                      'path': '$user', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, { // exclude userId
                    '$unset': 'userId'
                  }, {
                    '$lookup': { // comment performs join with user where reply.userId in comment equals user id in user collection
                      'from': 'users', 
                      'localField': 'reply.userId', 
                      'foreignField': '_id', 
                      'as': 'reply.user'
                    }
                  }, {
                    '$unwind': {  // outputs a new reply.user for each document in reply.user array
                      'path': '$reply.user', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, { // exclude reply.userId
                    '$unset': 'reply.userId'
                  }, {
                    '$lookup': { // comment performs join with listing where listingId in comment equals listing id in listing collection
                      'from': 'listings', 
                      'localField': 'listingId', 
                      'foreignField': '_id', 
                      'as': 'listing'
                    }
                  }, {
                    '$unwind': { // outputs a new listing for each document in listing array
                      'path': '$listing', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, { // exclude listingId
                    '$unset': 'listingId'
                  }, {
                    '$lookup': { // comment performs join with listing where reply.listingId in comment equals listing id in listing collection
                      'from': 'listings', 
                      'localField': 'reply.listingId', 
                      'foreignField': '_id', 
                      'as': 'reply.listing'
                    }
                  }, {
                    '$unwind': {  // outputs a new reply.listing for each document in reply.listing array
                      'path': '$reply.listing', 
                      'preserveNullAndEmptyArrays': true
                    }
                  }, { // exclude reply.listingId
                    '$unset': 'reply.listingId'
                  }, {
                    '$group': { // Group documents by listing id
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

/**
 * delete comment for given comment id
 * @path {DELETE} /comment/:id
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data Sucessfully deleted
*/
const deleteComment = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Comment Id missing");
            }
            // delete comment by comment id
            await models.comment.deleteOne({_id: req.params.id});
            // delete all comments whose parent id equals comment id
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