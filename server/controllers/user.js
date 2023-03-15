const mongoose = require("mongoose");

// Create a new user upon account creation and save the given data as a new entry in the database
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

// Update user profile information given a user id
const updateUser = (models) => {
    return async (req, res, next) => {
        try {
            // verify that a user id was given
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            // find the user object in the database by id, update with the given request body, and return the updated object data
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
            // returns all user objects in the database excluding the automatic version field and the password field.
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
            // verify that a user id was given
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            // find the user object in the database by id and return the object data
            // excludes the password field and automatic version field
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
            // verify that a user id was given
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            // find the user object in the database by id and return the PUBLIC object data
            // excludes the password field and automatic version field
            // will exclude the age, occupation, and email fields if their respective isPublic field is false
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.user.aggregate([
                    // Thanks Sakshi for helping write this query
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

// Gets only the user's profile picture for a given user id. Used to get the profile picture icon that will be used in the navbar
const getUserProfilePicById = (models) => {
    return async (req, res, next) => {
        try {
            // verify that a user id was given
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            // find the user object in the database by user id and return only the profile picture from the object data
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