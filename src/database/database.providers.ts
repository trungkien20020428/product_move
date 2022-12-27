import { Sequelize } from 'sequelize-typescript';
import ProductsModel from 'src/products/Models/product.model';
import ProductLineModel from 'src/products/Models/product_lines.model';
import ProductMoveModel from 'src/products/Models/product_move.model';
import ProductWarehousesModel from 'src/products/Models/product_warehouse.model';
import ProductWarrantyReasonModel from 'src/products/Models/product_warranty_reason.model';
import User from 'src/users/entities/user.entity';
import * as process from 'process';
import orderModel from 'src/ditribution/Models/order.model';
import customerModel from 'src/ditribution/Models/customer.model';
const Models = [
  User,
  ProductsModel,
  ProductLineModel,
  ProductMoveModel,
  ProductWarrantyReasonModel,
  ProductWarehousesModel,
  orderModel,
  customerModel,
];

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_ROOT_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      sequelize.addModels(Models);
      await sequelize.sync();
      return sequelize;
    },
  },
];
