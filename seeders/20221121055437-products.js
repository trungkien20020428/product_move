'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = [
      {
        product_name:'vfast 4',
        product_line_name:'vfast',
        status:1,
        code:'8932123122',
        userId:1,
        authorId:1,
      }
    ];
    await queryInterface.bulkInsert('products', products, {});
  },

  async down (queryInterface, Sequelize) {
  }
};
