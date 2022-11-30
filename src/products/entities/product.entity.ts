import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'products' })
export default class ProductsModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  product_line_id: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  photoURL: string;
}
