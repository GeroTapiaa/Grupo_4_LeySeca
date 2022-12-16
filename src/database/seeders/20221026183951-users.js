'use strict';
const usuarios = require('../../data/usersMigrate.json')
const user = usuarios.map(({ firstName, surname, address, avatar, user, date, email, password, rolId }) => {
  return {
    firstName,
    surname,
    address,
    avatar,
    user,
    date,
    email,
    password,
    rolId,
    createdAt: new Date()
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', user, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
