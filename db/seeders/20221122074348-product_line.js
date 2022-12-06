'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const product_lines = [
      {
        name: 'TOYOTA',
      },
      {
        name: 'HONDA',
      },
      {
        name: 'LEXUS',
      },
      {
        name: 'ROLLS-ROYCE',
      },
    ];
    console.log(product_lines);
    await queryInterface.bulkInsert('product_lines', product_lines, {});
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
