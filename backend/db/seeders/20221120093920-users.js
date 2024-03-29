'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const salt = 10;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        email: 'email@example.com',
        hash: await bcrypt.hash('Example@1234', salt),
        displayName: 'Example',
        roleId: 1,
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'factory@product_move.com',
        hash: await bcrypt.hash('12345678', salt),
        displayName: 'kien',
        roleId: 2,
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'dat@vnu.edu.vn',
        hash: await bcrypt.hash('Example@1234', salt),
        displayName: 'dat',
        roleId: 3,
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'khoa@vnu.edu.vn',
        hash: await bcrypt.hash('Example@1234', salt),
        displayName: 'TTBHA',
        roleId: 4,
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', users, {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  async down(queryInterface, Sequelize) {},
};
