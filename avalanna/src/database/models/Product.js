'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category,{as:'categories', foreignKey:"categoryId", onDelete: 'cascade'}),
      this.belongsToMany(models.User,{
        as:'users',
        through:"purchases",
        onDelete: 'cascade',
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    extraDescription: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    height: DataTypes.STRING,
    width: DataTypes.STRING,
    depth: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};