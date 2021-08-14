const userService = require('../service/userService')
const ApiError = require("../error/ApiError");

const checkName = (name) => {
    const regex = /\s/
    return name || !name.match(regex)
}

const checkPassword = (password) => {
    return password.length <= 16 && password.length >= 6 && checkName(password)
}

class UserController {


    async registration(req, res, next) {
        try {
            const {username, password} = req.body
            let user = ""

            if (!checkName(username)) {
                next(ApiError.badRequest('Неверный формат имени пользователя username'))
            } else if (!checkPassword(password)) {
                next(ApiError.badRequest('Неверный формат пароля password'))
            } else {
                user = await userService.registration(username, password)
            }
            return res.json(user)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const token = await userService.login(username, password)
            return res.json(token)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async get(req, res, next) {
        try {
            const id = req.params.id
            if (!id) {
                next(ApiError.badRequest('Не указан id'))
            }
            const user = await userService.get(id)
            return res.json(user)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await userService.getAll()
            return res.json(users)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async delete(req, res, next) {
        const id = req.user.id
        const user = await userService.delete(Number(id))
        return res.json(user ? "Пользователь успешно удален" : "Пользователь не удален")
    }

    async updatePassword(req, res, next) {
        try {
            const id = req.user.id
            const {password, newPassword} = req.body
            let user

            if (!checkPassword(newPassword)) {
                next(ApiError.badRequest('Неверный формат пароля newPassword'))
            } else {
                user = await userService.updatePassword(Number(id), password, newPassword)
            }
            return res.json(user ? "Пароль успешно изменен" : "Пароль не изменен")
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new UserController()