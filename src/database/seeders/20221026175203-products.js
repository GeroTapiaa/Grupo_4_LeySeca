'use strict';
const productos = require('../../data/productsMigrate.json')
const products = productos.map(({ name, price, discount, categoryId, productStatusId, description, sizeId, image }) => {
  return {
    name,
    price,
    discount,
    categoryId,
    productStatusId,
    description,
    sizeId,
    image,
    createdAt: new Date()
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', products, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});

  }
};
