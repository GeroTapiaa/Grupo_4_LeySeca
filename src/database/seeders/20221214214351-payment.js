'use strict';
const methodPayment = ['Transferencia','Mercado Pago', 'Tarjeta de credito', 'Tarjeta de debito']
const payments = methodPayment.map(payment => ({
  payment,
  createdAt : new Date()
}))
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
