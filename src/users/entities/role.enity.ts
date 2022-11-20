import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'user_role' })
export default class Role extends Model {
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
