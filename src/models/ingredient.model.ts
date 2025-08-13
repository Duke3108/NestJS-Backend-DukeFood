import { Category } from 'src/models/category.model';
import { Table,Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { OrderItemIngredient } from 'src/models/orderItemIngredient.model';
import { CartItemIngredients } from 'src/models/cartItemIngredients.model';

@Table
export class Ingredient extends Model<Ingredient> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  imageUrl: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isRequired: boolean;

  @ForeignKey(() => Category)
    @Column({
      allowNull: false,
      type: DataType.INTEGER,
    })
    categoryId: number;
  
    @BelongsTo(() => Category)
    category: Category;

  @HasMany(() => OrderItemIngredient)
  orderItemIngredients: OrderItemIngredient[]

  @HasMany(() => CartItemIngredients)
  cartItemIngredients: CartItemIngredients[]
}