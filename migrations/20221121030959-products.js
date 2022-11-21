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
        type:Sequelize.String({length:255}),
        allowNull:false
      },
      product_line_name:{
        type:Sequelize.String({length:255}),
        allowNull:false,
      },
      status:{
        type:Sequelize.DataTypes.BIGINT,
        allowNull:false,
      },
      code:{
        type:Sequelize.String({length:255}),
        allowNull:false,
      },
      userId :{
        type:Sequelize.DataTypes.BIGINT,
        allowNull:false,
      },
      authorId :{
        type:Sequelize.DataTypes.BIGINT,
        allowNull:false,
      },
      createAt :{
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updateAt:{
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
