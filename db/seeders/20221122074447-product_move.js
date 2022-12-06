'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const product_move = [
      {
        from: 3,
        to: 2,
        product_id: 1,
        status: 1,
        isPending: true,
      },
    ];
    await queryInterface.bulkInsert('product_move', product_move, {});
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
