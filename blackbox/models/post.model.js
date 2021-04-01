const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')

const Posts = sequelize.define('posts', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,        
        allowNull: false
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },      
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }      
})


module.exports = Posts