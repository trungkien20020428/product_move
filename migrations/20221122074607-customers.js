'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customers',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT,
      },
      name:{
        type:Sequelize.STRING({length:255}),
        allowNull:false
      },
     phone:{
        type:Sequelize.STRING({length:255}),
        allowNull:false,
      },
     product_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
     user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
     address :{
        type:Sequelize.STRING({length:255}),
        allowNull:false,
      },
      createdAt :{
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt:{
        allowNull:false,
        type:Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
