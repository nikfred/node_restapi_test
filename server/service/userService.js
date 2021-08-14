const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')


class UserService {
    async registration(username, password) {
        const user = await User.findOne({where: {username}})
        if (user) {
            console.log(user)
            throw ApiError.badRequest('Пользователь уже существует')
        }

        const hash = await bcrypt.hash(password, 6)
        return await User.create({username, password: hash})
    }


    async login(username, password) {
        const user = await User.findOne({where: {username}})
        if (!user) {
            throw ApiError.badRequest('Пользователя с таким именем не существует')
        }

        const equivalence = await bcrypt.compareSync(password, user.password)
        if (!equivalence) {
            throw ApiError.badRequest('Введен неверный пароль')
        }
        const payload = {
            id: String  (user.id),
            username
        }
        console.log(payload)
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h"})
    }


    async getAll() {
        return await User.findAll()
    }

    async get(id) {
        const user = await User.findOne({where: {id}})
        if (!user) {
            throw ApiError.notFound('Пользователь с указанным id не найден')
        }
        return user
    }

    async updatePassword(id, password, newPassword) {
        const user = await this.get(id)
        const equivalence = await bcrypt.compareSync(password, user.password)
        if (!equivalence) {
            throw ApiError.badRequest('Введен неверный пароль')
        }
        const hash = await bcrypt.hash(newPassword, 6)
        const updateUser = await User.update({password: hash},{where: {id}} )
        console.log(updateUser);
        return updateUser
    }

    async delete(id) {
        return await User.destroy({where: {id}})
    }
}

module.exports = new UserService()