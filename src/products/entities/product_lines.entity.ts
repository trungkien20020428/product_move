import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'product_lines' })
export default class Product_line extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  code: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
