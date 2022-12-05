'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const product_warehouse = [
      {
        id: '2200MT0001',
        product_id: 1,
        author_id: 2,
        user_id: 4,
        status: 2,
      },
      {
        id: '2200MT0002',
        product_id: 2,
        author_id: 2,
        user_id: 4,
        status: 2,
      },
    ];
    await queryInterface.bulkInsert(
      'product_warehouses',
      product_warehouse,
      {},
    );
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
