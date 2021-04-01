const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')
const Post = require('./post.model')

const users = sequelize.define('Users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nameAndSurname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },    
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
        // unique: {
        //     args: true,
        //     msg: "Email is already in use"
        // }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

users.hasMany(Post, { foreignKey: 'userID', sourceKey: 'id' });
Post.belongsTo(users, { foreignKey: 'userID', targetKey: 'id' });


module.exports = users