// add like
const like = (models) => {
    return async (req, res, next) => {
        try {
            const like = new models.like(req.body);
            return res.status(200).json({
                success: true,
                message: 'success',
                data: await like.save()
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// delete like for given like id
const unlike = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Like Id missing");
            }
            await models.like.deleteOne({_id: req.params.id});
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
    like,
    unlike
}