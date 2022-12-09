import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'product_lines' })
export default class ProductLineModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
