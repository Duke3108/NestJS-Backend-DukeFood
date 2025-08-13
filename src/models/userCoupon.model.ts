import { Table,Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Coupon } from 'src/models/coupon.model';
import { User } from 'src/models/user.model';

@Table
export class UserCoupon extends Model<UserCoupon> {
  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isUsed: boolean;

  @Column({
    type: DataType.DATE,
  })
  usedAt: Date;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Coupon)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  couponId: number;

  @BelongsTo(() => Coupon)
  coupon: Coupon
}