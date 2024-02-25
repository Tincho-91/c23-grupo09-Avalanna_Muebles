'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
        name:'LIVING',
      },
      {
        name:'COCINA',
      },
      {
        name:"DORMITORIO"
      },
      {
        name:"EXTERIOR"
      },
      {
        name:"COMBOS"

      },{
        name:"NEW IN"
      }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('categories', null, {});
    
  }
};
