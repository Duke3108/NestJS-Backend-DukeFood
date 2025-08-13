import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Order } from 'src/models/order.model';
import { OrderItemIngredient } from 'src/models/orderItemIngredient.model';
import { Product } from 'src/models/product.model';
import { ProductVariant } from 'src/models/productVariant.model';

@Table
export class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => ProductVariant)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  variantId: number;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;

  @Column({
    defaultValue: 1,
    type: DataType.INTEGER,
  })
  quantity: number;

  @HasMany(() => OrderItemIngredient)
  orderItemIngredients: OrderItemIngredient[]
}
