const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            next(ApiError.unauthorized('Пользователь не авторизован'))
        }
        req.user = jwt.decode(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        console.log(e)
        next(ApiError.unauthorized('Пользователь не авторизован'))
    }
}