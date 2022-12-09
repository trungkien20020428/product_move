'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        name: 'ROLLS-ROYCE - motor 1',
        product_line_id: 4,
        isCreate: true,
        photoURL: '',
      },
      {
        name: 'toyota -motor 1',
        product_line_id: 2,
        isCreate: true,
        photoURL: '',
      },
    ];
    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {},
};
