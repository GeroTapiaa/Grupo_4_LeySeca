'use strict';
const productos = require('../../data/products.json')
const products = productos.map(({name , price , discount , category, description}) => {
  return {
    name,
    price,
    discount,
    category,
    description,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Products', products, {});
    
  },

  async down (queryInterface, Sequelize) { 
      await queryInterface.bulkDelete('Products', null, {});
     
  }
};
