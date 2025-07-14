
import { Table,Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Ingredient } from 'src/models/ingredient.model';
import { Product } from 'src/models/product.model';

@Table
export class ProductIngredient extends Model<ProductIngredient> {
  @Column({
    defaultValue: 1,
    type: DataType.INTEGER,
  })
  quantity: number;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isDefault: boolean;
  
  @ForeignKey(() => Product)
    @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @ForeignKey(() => Ingredient)
    @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ingredientId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient;
}