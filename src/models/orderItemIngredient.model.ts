import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Ingredient } from 'src/models/ingredient.model';
import { OrderItem } from 'src/models/orderItem.model';

@Table
export class OrderItemIngredient extends Model<OrderItemIngredient> {
  @ForeignKey(() => OrderItem)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  orderItemId: number;

  @BelongsTo(() => OrderItem)
  orderItem: OrderItem;

  @ForeignKey(() => Ingredient)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ingredientId: number;

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient;

  @Column({
    defaultValue: 1,
    type: DataType.INTEGER,
  })
  quantity: number;
}
