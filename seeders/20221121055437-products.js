'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = [
      {

      }
    ];
    await queryInterface.bulkInsert(products,'products',{})
  },

  async down (queryInterface, Sequelize) {
  }
};
