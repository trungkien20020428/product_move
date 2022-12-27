'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_warehouses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING({ length: 255 }),
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // nguoi dang nam du san pham
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
      },
      warrantyDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
      photoURL: {
        type: Sequelize.STRING({ length: 255 }),
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
