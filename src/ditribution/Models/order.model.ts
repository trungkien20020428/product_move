import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'orders' })
export default class OrderModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  customer_id: number;

  //distributionId
  @Column
  user_id: number;

  @Column
  product_id: number;

  @Column
  createdAt: Date;

  @Column
  updateAt: Date;
}
