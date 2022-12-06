'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [
      {
        name: 'ROLLS-ROYCE - motor 1',
        product_line_id: 4,
        photoURL: '',
      },
      {
        name: 'toyota -motor 1',
        product_line_id: 2,
        photoURL: '',
      },
    ];
    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {},
};
