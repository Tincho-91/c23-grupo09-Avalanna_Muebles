'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      extraDescription: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'categories'
          },
          key: "id"
      },
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      height: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      width: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      depth: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};