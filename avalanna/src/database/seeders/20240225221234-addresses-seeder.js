'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('addresses', [{
        country: "Argentina",
        province: "Buenos Aires",
        number: 654,
        streetName: "9 De Julio",
        postalCode: 3214,
        locality: "Lanus",
        userId: 1
      },
      {
        country: "Argentina",
        province: "Buenos Aires",
        number: 425,
        streetName: "Corrientes",
        postalCode: 1824,
        locality: "Lomas de Zamora",
        userId: 2
      },
      {
        country: "Argentina",
        province: "Buenos Aires",
        number: 856,
        streetName: "Ituzaingo",
        postalCode: 1245,
        locality: "Lanus",
        userId: 3,
      },
      {
        country: "Argentina",
        province: "Buenos Aires",
        number: 987,
        streetName: "Irigoyen",
        postalCode: 1822,
        locality: "Lanus",
        userId: 4,
      },
      {
        country: "Argentina",
        province: "Buenos Aires",
        number: 457,
        streetName: "Eva Perón",
        postalCode: 3214,
        locality: "Avellaneda",
        userId: 5,
      },
      {
        country: "Argentina",
        province: "Buenos Aires",
        number: 532,
        streetName: "Calchaqui",
        postalCode: 4532,
        locality: "Florencio Varela",
        userId: 6,
      },
      ], {}); 
  },

  async down (queryInterface, Sequelize) {
     
      await queryInterface.bulkDelete('addresses', null, {});
   
  }
};
