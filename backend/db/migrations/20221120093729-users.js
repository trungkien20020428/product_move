'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT,
      },
      email: {
        type: Sequelize.STRING({ length: 255 }),
        unique: true,
        allowNull: false,
      },
      hash: {
        type: Sequelize.STRING({ length: 255 }),
        allowNull: false,
      },
      displayName: {
        type: Sequelize.STRING({ length: 255 }),
        allowNull: false,
      },
      photoURL: {
        type: Sequelize.STRING({ length: 255 }),
        allowNull: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING({ length: 155 }),
        allowNull: false,
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
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
