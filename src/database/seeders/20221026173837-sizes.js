const size = ['S','M','L','XL','XXL','XXXL', 'Talle único']

const sizes = size.map((size) => {
  return {
    size,
    createdAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Sizes',sizes, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Sizes', null, {});
    
  }
};