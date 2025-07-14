import { Table,Model, Column, DataType } from 'sequelize-typescript';

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  avatar: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    allowNull: false,
    defaultValue: UserRole.CUSTOMER,
    type: DataType.ENUM(...Object.values(UserRole)),
  })
  role: UserRole;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  provider: string;

  //Relationships
}