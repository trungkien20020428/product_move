import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'product_warehouses' })
export default class ProductWarrantyReasonModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  product_warehouse_id: string;

  @Column
  seriveCenterId: number;

  @Column
  product_line_id: number;

  @Column
  status: number;
  
  @Column
  createAt: Date;

  @Column
  updatedAt: Date;
}
