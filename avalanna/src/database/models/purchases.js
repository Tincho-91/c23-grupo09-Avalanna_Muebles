'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  }
  purchases.init({
    idUsers: DataTypes.INTEGER,
    idProducts: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    purchaseDate: DataTypes.DATE,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'purchases',
  });
  return purchases;
};