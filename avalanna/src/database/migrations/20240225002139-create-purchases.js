'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'users'
          },
          key: "id"
      },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'products'
          },
          key: "id"
      },
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchases');
  }
};