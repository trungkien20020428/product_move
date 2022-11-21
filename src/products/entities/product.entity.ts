import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'products' })
export default class Products extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  product_name: string;

  @Column
  product_line_name: string;

  @Column
  status: number;

  @Column
  code: string;

  @Column
  userId: number;

  @Column
  authorId: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  insuranceAt: Date;
}
