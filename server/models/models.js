const sql = require('sequelize')
const sequelize = require('../db')


const User = sequelize.define('user', {
    id: {type: sql.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: sql.STRING, unique: true},
    password: {type: sql.STRING}
})

module.exports = {
    User
}