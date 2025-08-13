import { Table,Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Address } from 'src/models/address.model';
import { OrderItem } from 'src/models/orderItem.model';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';

export enum OrderStatus {
  PENDING = 'Đang chờ',
  COMPLETED = 'Đã xác nhận',
  CANCELLED = 'Đã hủy',
  PREPARING = 'Đang chuẩn bị',
  READY = 'Sẵn sàng',
  DELIVERED = 'Đã giao hàng',
}

export enum PaymentMethod {
    CASH = 'Tiền mặt',
    ONLINE = 'Trực tuyến',
}

export enum PaymentStatus {
    PENDING = 'Chờ thanh toán',
    COMPLETED = 'Đã thanh toán',
    FAILED = 'Thanh toán thất bại',
    REFUNDED = 'Hoàn tiền',
}

@Table
export class Order extends Model<Order> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  orderNumber: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(OrderStatus)),
  })
  status: OrderStatus;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(PaymentMethod)),
  })
  paymentMethod: PaymentMethod;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(PaymentStatus)),
  })
  paymentStatus: PaymentStatus;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  subTotal: number;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  deliveryFee: number;
  
  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  discount: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  total: number;

  @Column({
    type: DataType.TEXT,
  })
  notes: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() =>User)
  user: User

  @ForeignKey(() => Address)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  addressId: number;

  @BelongsTo(() =>Address)
  address: Address

  @HasMany(() => OrderItem)
  orders: OrderItem[]

  @HasMany(() => Review)
  reviews: Review[]
}