import { Sequelize } from 'sequelize-typescript';
import ProductsModel from 'src/products/entities/product.entity';
import ProductLineModel from 'src/products/entities/product_lines.entity';
import ProductMoveModel from 'src/products/entities/product_move.entity';
import ProductWarehousesModel from 'src/products/entities/product_warehouse.enity';
import ProductWarrantyReasonModel from 'src/products/entities/product_warranty_reason.enity';
import User from 'src/users/entities/user.entity';

const Models = [
  User,
  ProductsModel,
  ProductLineModel,
  ProductMoveModel,
  ProductWarrantyReasonModel,
  ProductWarehousesModel,
];

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
