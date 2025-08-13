import { Table,Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CartItem } from 'src/models/cartItem.model';
import { Ingredient } from 'src/models/ingredient.model';

@Table
export class CartItemIngredients extends Model<CartItemIngredients> {
  @Column({
      defaultValue: 1,
      type: DataType.INTEGER,
    })
    quantity: number;
  
  @ForeignKey(() => CartItem)
      @Column({
        allowNull: false,
        type: DataType.INTEGER,
      })
      cartItemId: number;
    
      @BelongsTo(() =>CartItem)
      cartItem: CartItem
  
  @ForeignKey(() => Ingredient)
      @Column({
        allowNull: false,
        type: DataType.INTEGER,
      })
      ingredientId: number;
    
      @BelongsTo(() =>Ingredient)
      ingredient: Ingredient
  
}