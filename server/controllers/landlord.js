// Create a new landlord upon account creation
const createLandlord = (models) => {
    return async (req, res, next) => {
        try {
            const landlord = new models.landlord(req.body);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await landlord.save()
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// Update landlord profile information
const updateLandlord = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("Landlord Id missing")
            }
            await models.landlord.findByIdAndUpdate(req.params.id, req.body, {new: true})
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.landlord.findById(req.params.id).select({ __v: 0, password: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

const getLandlordInfoById = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("Landlord Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.landlord.findById(req.params.id).select({ __v: 0, password: 0 })
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

const getLandlordProfilePicById = (models) => {
    return async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw new Error("User Id missing")
            }
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await models.landlord.findById(req.params.id).select({ profilePicture: 1 })
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
    createLandlord,
    updateLandlord,
    getLandlordInfoById,
    getLandlordProfilePicById
}