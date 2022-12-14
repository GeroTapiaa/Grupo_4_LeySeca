'use strict';
const {hashSync} = require('bcryptjs')

const estados = ['pendiente','finalizado','cancelado'];

const statuses = estados.map(status => ({
  state : status,
  createdAt : new Date()
}))

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('States', statuses, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('States', null, {});
     
  }
};
