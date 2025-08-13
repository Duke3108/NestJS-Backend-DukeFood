import { Table,Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Order } from 'src/models/order.model';
import { User } from 'src/models/user.model';

@Table
export class Address extends Model<Address> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  street: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  city: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  district: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  ward: string;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  longitude: number;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
  })
  latitude: number;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isDefault: boolean;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Order)
  orders: Order[]
}