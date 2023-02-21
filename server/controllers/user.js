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
                data: await models.user.findByIdAndUpdate(req.params.id, req.body, {new: true})
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
                data: await models.user.find().select({ __v: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Get user for given user id
const getUserById = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.user.findById(req.params.id).select({ __v: 0 })
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
    getUserById
}