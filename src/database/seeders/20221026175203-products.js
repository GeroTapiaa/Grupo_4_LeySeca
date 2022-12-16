'use strict';
const productos = require('../../data/productsMigrate.json')
const products = productos.map(({ nameProduct, price, discount, categoryId, productStatusId, description, sizeId, image }) => {
  return {
    nameProduct,
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
