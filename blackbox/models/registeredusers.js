'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registeredUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  registeredUsers.init({
    name: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    profileUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'registeredUsers',
  });
  return registeredUsers;
};