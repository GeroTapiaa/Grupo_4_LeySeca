'use strict';
const categorias = ['Cerveza', 'Indumentaria'];
const categories = categorias.map(category => {
  return {
    name : category,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Categories', categories, {});
    
  },

  async down (queryInterface, Sequelize) { 
      await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
