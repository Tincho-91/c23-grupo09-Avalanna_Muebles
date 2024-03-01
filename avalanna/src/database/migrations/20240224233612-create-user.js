'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nameAndSurname: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'rols'
          },
          key: "id"
      },
      onDelete: 'CASCADE'
      },
      birthday: {
        type: DataTypes.DATEONLY
      },
      profileImage: {
        type: DataTypes.STRING
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
  async down(queryInterface, Sequelise) {
    await queryInterface.dropTable('Users');
  }
};