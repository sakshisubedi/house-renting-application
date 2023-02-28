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
            console.log(req.body.password)
            await models.user.findByIdAndUpdate(req.params.id, req.body, {new: true})
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

// Get all users
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
// this function currently doesn't work as intended at the moment (doesn't actually ignore email/age/occupation acording to isPublic)
const getUserPublicInfoById = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            
            // get whole user object and drop fields (email, age, occupation) marked with isPublic = false
            var user = await models.user.findById(req.params.id).select({ __v: 0, password: 0 })
            if (!user.email.isPublic) {
                delete user.email;
            }
            if (!user.age.isPublic) {
                delete user.age;
            }
            if (!user.occupation.isPublic) {
                delete user.occupation;
            }

            return res.status(200).json({
                success: true,
                message: 'success',
                data: user
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
                data: await models.user.findById(req.params.id).select({ __v: 0, name: 0, email: 0, 
                    password: 0, isVerified: 0, pronoun: 0, age: 0, occupation: 0, preferredMoveInDate: 0,
                    preferPet: 0, isLookingForFlatmate: 0
                })
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