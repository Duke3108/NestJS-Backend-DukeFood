import { Table,Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { CartItem } from 'src/models/cartItem.model';
import { Category } from 'src/models/category.model';
import { OrderItem } from 'src/models/orderItem.model';
import { ProductIngredient } from 'src/models/productIngredient.model';
import { ProductVariant } from 'src/models/productVariant.model';
import { Review } from 'src/models/review.model';

@Table
export class Product extends Model<Product> {
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
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  slug: string;

    @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  basePrice: number;

  @Column({
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isFeatured: boolean;

  @Column({type: DataType.VIRTUAL(DataType.INTEGER)})
  variantPrice: number;

  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => ProductVariant)
  productVariants: ProductVariant[]

  @HasMany(() => ProductIngredient)
  productIngredients: ProductIngredient[]

  @HasMany(() => OrderItem)
  orderItems: OrderItem[]

  @HasMany(() => CartItem)
  cartItems: CartItem[]
  
  @HasMany(() => Review)
  reviews: Review[]
}