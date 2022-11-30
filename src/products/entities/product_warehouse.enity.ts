import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'product_warehouses' })
export default class ProductWarehousesModel extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column
  product_id: number;

  @Column
  author_id: number; //factory

  @Column
  user_id: number;

  @Column
  order_id: number;

  @Column
  isCofirm: boolean;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  warrantyDate: Date;

  @Column
  status: number;
}
