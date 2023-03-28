import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import ProductsModel from './product.model';

@Table({ tableName: 'product_warehouses' })
export default class ProductWarehousesModel extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => ProductsModel)
  @Column
  product_id: number;

  @Column
  warrantyDate: Date;
  @Column
  author_id: number; //factory

  @Column
  user_id: number;

  @Column
  order_id: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  status: number;

  @BelongsTo(() => ProductsModel)
  ProductsModel: ProductsModel;
}
