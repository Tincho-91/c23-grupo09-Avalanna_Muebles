'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
        name:'LIVING',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name:'COCINA',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name:"DORMITORIO",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name:"EXTERIOR",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name:"COMBOS",
        createdAt: new Date,
        updatedAt: new Date

      },{
        name:"NEW IN",
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('categories', null, {});
    
  }
};
