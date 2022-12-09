import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'product_move' })
export default class ProductMoveModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  from: string;

  @Column
  to: string;

  @Column
  isPending: boolean;

  @Column
  status: number;

  @Column
  product_id: number;

  @Column
  createdAt: Date;

  @Column
  updateAt: Date;
}
