import { Table,Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { CartItem } from 'src/models/cartItem.model';
import { User } from 'src/models/user.model';

@Table
export class Cart extends Model<Cart> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => CartItem)
  cartItems: CartItem[]
}