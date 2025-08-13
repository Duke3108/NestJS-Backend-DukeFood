import { Table,Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Cart } from 'src/models/cart.model';
import { CartItemIngredients } from 'src/models/cartItemIngredients.model';
import { Product } from 'src/models/product.model';
import { ProductVariant } from 'src/models/productVariant.model';

@Table
export class CartItem extends Model<CartItem> {
  @Column({
    defaultValue: 1,
    type: DataType.INTEGER,
  })
  quantity: number;

  @ForeignKey(() => Cart)
    @Column({
      allowNull: false,
      type: DataType.INTEGER,
    })
    cartId: number;
  
    @BelongsTo(() =>Cart)
    cart: Cart

    @ForeignKey(() => Product)
    @Column({
      allowNull: false,
      type: DataType.INTEGER,
    })
    productId: number;
  
    @BelongsTo(() =>Product)
    product: Product

    @ForeignKey(() => ProductVariant)
    @Column({
      allowNull: false,
      type: DataType.INTEGER,
    })
    variantId: number;
  
    @BelongsTo(() =>ProductVariant)
    variant: ProductVariant

    @HasMany(() => CartItemIngredients)
    cartItemIngredients: CartItemIngredients[]
}