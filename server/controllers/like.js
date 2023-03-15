/**
 * adds like
 * @path {POST} /like
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data fetch added like
*/
const like = (models) => {
    return async (req, res, next) => {
        try {
            // create a like
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

/**
 * delete like for given like id
 * @path {DELETE} /like/:id
 * @response {String} success is true for successful completion of request
 * @response {String} message is successful if the request completes successfully and contains the error message in case of unsuccessful execution
 * @response {String} data Successfully deleted
*/
const unlike = (models) => {
    return async (req, res, next) => {
        try {
            if(!req.params.id) {
                throw new Error("Like Id missing");
            }
            // delete a like for given like id
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