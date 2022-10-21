'use strict';
const usuarios = require('../../data/users.json')
const user = usuarios.map(({name, lastName, address, avatar,user,date, email, password, rol}) => {
  return {
     name,
     lastName,
     address,
     avatar,
     user,
     date,
     email,
     password,
     rol,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', user, {});
    
  },

  async down (queryInterface, Sequelize) { 
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
