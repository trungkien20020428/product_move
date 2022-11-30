import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'product_warehouses' })
export default class ProductWanrrantyReasonModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  orderId: number;

  @Column
  problem: string;

  @Column
  type: number;

  @Column
  createAt: Date;

  @Column
  updatedAt: Date;
}
