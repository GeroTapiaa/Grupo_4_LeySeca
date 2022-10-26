'use strict';
const status = ['off', 'Recommended'];
const statuses = status.map(status => {
  return {
    name: status,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Product-statuses', statuses, {});
    
  },

  async down (queryInterface, Sequelize) { 
      await queryInterface.bulkDelete('Product-statuses', null, {});
     
  }
};
