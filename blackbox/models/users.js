'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      //(Assosiate with what (in this case)?)
    }
  };
  Users.init({
    name: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    osintInfo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};