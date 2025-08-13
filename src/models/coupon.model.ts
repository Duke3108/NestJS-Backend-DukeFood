import { Table,Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { UserCoupon } from 'src/models/userCoupon.model';

export enum CouponType {
  FIXED = 'FIXED',
  PERCENT = 'PERCENT',
}

@Table
export class Coupon extends Model<Coupon> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  code: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;
  
  @Column({
    type: DataType.TEXT,
  })
  description: string;
  
  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(CouponType)),
  })
  type: CouponType;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  value: number;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  minOrderAmount: number;
  
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  maxUses: number;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  currentUses: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  validFrom: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  validTo: Date;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @HasMany(() => UserCoupon)
  userCoupons: UserCoupon[]
}