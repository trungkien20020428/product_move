'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = [
      {
        customer_id: 1,
        user_id: 4,
        product_id: 1,
      },
      {
        customer_id: 2,
        user_id: 4,
        product_id: 2,
      },
    ];
    await queryInterface.bulkInsert('orders', orders, {});
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
