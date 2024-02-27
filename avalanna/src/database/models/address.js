'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{as:'users',onDelete: 'CASCADE'});
    }
  }
  Address.init({
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    number: DataTypes.INTEGER,
    streetName: DataTypes.STRING,
    postalCode: DataTypes.INTEGER,
    locality: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};