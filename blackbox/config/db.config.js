const Sequelize = require('sequelize')
require('dotenv').config()

const DB_NAME = process.env.DB_NAME
const USER_NAME = process.env.USER_NAME
const PASSWORD = process.env.PASSWORD //(Hide pass to .gitignored file before push) Or don't :D

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

module.exports = sequelize