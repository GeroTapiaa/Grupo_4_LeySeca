'use strict';
const roles = ['admin', 'user']
const rols = roles.map( rol => {
  return {
     name : rol,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Rols', rols, {});
    
  },

  async down (queryInterface, Sequelize) { 
      await queryInterface.bulkDelete('Rols', null, {});
     
  }
};