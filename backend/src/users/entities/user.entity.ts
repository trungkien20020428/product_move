import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export default class User extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  hash: string;

  @Column
  displayName: string;

  @Column
  phone: string;

  @Column
  photoURL: string;

  @Column
  roleId: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
