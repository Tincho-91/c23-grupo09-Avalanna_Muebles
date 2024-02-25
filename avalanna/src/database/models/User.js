'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Rol,{as:'rols',onDelete: 'cascade'}),
    this.hasMany(models.Address,{as:'addresses',onDelete: 'cascade'}),
    this.belongsToMany(models.Products,{
      trough:"purchases",
      as:'products',
      onDelete: 'cascade',
    })
  }
  }
  User.init({
    nameAndSurname: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    password: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    profileImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};