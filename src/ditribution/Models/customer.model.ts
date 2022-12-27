import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'customers' })
export default class customerModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  address: string;

  @Column
  createdAt: Date;

  @Column
  UpdatedAt: Date;
}
