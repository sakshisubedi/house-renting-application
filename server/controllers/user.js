const mongoose = require("mongoose");

// Create a new user upon account creation
const createUser = (models) => {
    return async (req, res, next) => {
        try {
            const user = new models.user(req.body);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await user.save()
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Update user profile information
const updateUser = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.user.findByIdAndUpdate(req.params.id, req.body, {new: true}).select({ __v: 0, password: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Get all users in the database
const getUsers = (models) => {
    return async (req, res, next) => {
        try {
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.user.find().select({ __v: 0, password: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Gets all user information including private fields for given user id
const getUserAllInfoById = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.user.findById(req.params.id).select({ __v: 0, password: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Gets only public information for a user for given user id
const getUserPublicInfoById = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.user.aggregate([
                    {
                        '$match': {
                            '_id': mongoose.Types.ObjectId(req.params.id)
                        }
                    }, {
                        '$project': {
                          '_id': 1, 
                          'name': 1, 
                          'age': {
                            '$cond': [
                              {
                                '$eq': [
                                  '$age.isPublic', true
                                ]
                              }, '$age.data', null
                            ]
                          }, 
                          'email': {
                            '$cond': [
                              {
                                '$eq': [
                                  '$email.isPublic', true
                                ]
                              }, '$email.data', null
                            ]
                          }, 
                          'occupation': {
                            '$cond': [
                              {
                                '$eq': [
                                  '$occupation.isPublic', true
                                ]
                              }, '$occupation.data', null
                            ]
                          }, 
                          'password': 1, 
                          'pronoun': 1, 
                          'preferredMoveInDate': 1, 
                          'preferPet': 1, 
                          'isLookingForFlatmate': 1, 
                          'profilePicture': 1, 
                          'createdAt': 1, 
                          'updatedAt': 1
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

// Gets only the user's profile picture for a given user id
const getUserProfilePicById = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.user.findById(req.params.id).select({ profilePicture: 1 })
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
    createUser,
    updateUser,
    getUsers,
    getUserAllInfoById,
    getUserPublicInfoById,
    getUserProfilePicById
}