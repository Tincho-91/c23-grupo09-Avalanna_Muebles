'use strict';
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const users = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data-json/users.json'),'utf-8'));
const data = users.map(user => {
  user.password = bcrypt.hashSync(user.password,10);
  user.createdAt = new Date;
  user.updatedAt = new Date;
  return user
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('users', data, {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});

  }
};
