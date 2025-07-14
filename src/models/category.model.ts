import { Table,Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Product } from 'src/models/product.model';

@Table
export class Category extends Model<Category> {
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
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  sortOrder: number;

  @Column({
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  isActive: boolean;

  //Relationships
  @HasMany(() => Product)
  products: Product[];
}