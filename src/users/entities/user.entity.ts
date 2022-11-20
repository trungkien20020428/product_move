import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Role from './role.enity';

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

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @BelongsTo(() => Role)
  Role: Role;
}
