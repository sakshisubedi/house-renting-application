const login = () => {
    return async (req, res, next) => {
        try {
            return res.status(200).json({
                success: true,
                message: 'success',
                data: "successful login"
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
    login
}