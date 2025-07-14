import { Table,Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from 'src/models/product.model';

export enum ProductVariantSize {
  SMALL = '15cm',
  MEDIUM = '20cm',
  LARGE = '25cm',
}

export enum ProductVariantType {
  THIN = 'Mỏng',
  NORMAL = 'Bình thường',
  THICK = 'Dày',
}

@Table
export class ProductVariant extends Model<ProductVariant> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ProductVariantSize)),
  })
  size: ProductVariantSize;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(ProductVariantType)),
  })
  type: ProductVariantType;

  @Column({
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  modifiedPrice: number;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}