'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
        name:'LIVING',
        image: "living-home.png",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name:'COCINA',
        image: "cocina-home.png",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name:"DORMITORIO",
        image: "dormitorio-home.png",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name:"EXTERIOR",
        image: "exterior-home.png",
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name:"COMBOS",
        image: "combos-home.png",
        createdAt: new Date,
        updatedAt: new Date

      },{
        name:"NEW IN",
        image: "newIn-home.png",
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('categories', null, {});
    
  }
};
