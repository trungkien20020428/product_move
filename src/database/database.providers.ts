import { Sequelize } from 'sequelize-typescript';
import Role from 'src/users/entities/role.enity';
import User from 'src/users/entities/user.entity';

//Users
const UserModels = [User, Role];

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Hoangkien02pl@',
        database: 'product_move',
      });
      sequelize.addModels(UserModels);
      await sequelize.sync();
      return sequelize;
    },
  },
];
