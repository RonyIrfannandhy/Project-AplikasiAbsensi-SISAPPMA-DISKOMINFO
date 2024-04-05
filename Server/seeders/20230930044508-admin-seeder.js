'use strict';

/** @type {import('sequelize-cli').Migration} */
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
   return queryInterface.bulkInsert('Admins', [
    {  
    nama: 'Admin1',
      username: 'Admin1',
      password: '$2a$10$Mq2p.07xMPLSIgPShT/2CuGpVrR2huXz8cAqKmcO7tiKJK.NIyAg6'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', {}, null);
  }
};
