'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT,
      },
      product_name:{
        type:Sequelize.STRING({length:255}),
        allowNull:false
      },
      product_line_name:{
        type:Sequelize.STRING({length:255}),
        allowNull:false,
      },
      status:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      code:{
        type:Sequelize.STRING({length:255}),
        allowNull:false,
      },
      userId :{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      authorId :{
        type:Sequelize.INTEGER,
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
      insuranceAt:{
        type:Sequelize.DATE,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
