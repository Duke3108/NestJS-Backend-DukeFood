import { Table,Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from 'src/models/category.model';

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

  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}