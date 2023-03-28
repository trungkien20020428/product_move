import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import ProductLineModel from './product_lines.model';

@Table({ tableName: 'products' })
export default class ProductsModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  name: string;

  @ForeignKey(() => ProductLineModel)
  @Column
  product_line_id: number;

  @Column
  isCreate: boolean;
  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  photoURL: string;

  @BelongsTo(() => ProductLineModel)
  productLineModel: ProductLineModel;
}
