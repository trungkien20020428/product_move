import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import ProductsModel from './product.model';
import User from 'src/users/entities/user.entity';
import ProductWarehousesModel from './product_warehouse.model';

@Table({ tableName: 'product_move' })
export default class ProductMoveModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  from: string;

  @ForeignKey(() => ProductWarehousesModel)
  @Column
  product_warehouse_id: string;

  @Column
  to: string;

  @Column
  isPending: boolean;

  @ForeignKey(() => ProductsModel)
  @Column
  product_id: number;

  @Column
  status: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @BelongsTo(() => ProductsModel)
  ProductModels: ProductsModel;

  @BelongsTo(() => ProductWarehousesModel)
  ProductWarehousesModel: ProductWarehousesModel;
}
