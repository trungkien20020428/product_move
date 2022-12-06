'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = [
      {
        name: 'nguyen van A',
        phone: '123456789',
        address: 'mien_Bac',
      },
      {
        name: 'nguyen van B',
        phone: '123456789',
        address: 'mien_Bac',
      },
    ];
    await queryInterface.bulkInsert('customers', customers, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
