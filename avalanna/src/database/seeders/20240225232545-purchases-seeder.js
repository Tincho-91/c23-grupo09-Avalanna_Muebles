'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('purchases', [{
        userId: 1,
        productId: 4,
        total: 110000,
        paymentMethod: "tarjeta de crédito",
        purchaseDate: "2022-12-18 14:22:36",
        quantity:1
      }, 
      {
        userId: 2,
        productId: 7,
        total: 136000,
        paymentMethod: "mercado pago",
        purchaseDate: "2022-11-06 15:00:06",
        quantity:2
      },
      {
        userId: 3,
        productId: 7,
        total: 204000,
        paymentMethod: "efectivo",
        purchaseDate: "2022-09-17 18:35:00",
        quantity:3
      },
      
      ], {}); 
  },

  async down (queryInterface, Sequelize) {
     
      await queryInterface.bulkDelete('purchases', null, {});
   
  }
};