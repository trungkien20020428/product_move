import { Sequelize } from 'sequelize-typescript';
import Products from 'src/products/entities/product.entity';
import User from 'src/users/entities/user.entity';

const Models = [User, Products];

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
      sequelize.addModels(Models);
      await sequelize.sync();
      return sequelize;
    },
  },
];
