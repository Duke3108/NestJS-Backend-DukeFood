import { Table,Model, Column, DataType, HasMany, BeforeValidate, BeforeUpdate } from 'sequelize-typescript';
import { Product } from 'src/models/product.model';
import Helper from 'src/utils/helper';

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

  @BeforeValidate
  static makeSlug(newCategory: Category) {
    const name = newCategory.dataValues.name;
    if(newCategory.isNewRecord && name){
      const slug = Helper.makeSlugFromString(name);
      newCategory.setDataValue('slug', slug);
    }
  }

  @BeforeUpdate
  static updateSlug(category: Category) {
    if(category.changed('name')) {
      const name = category.dataValues.name;
      const slug = Helper.makeSlugFromString(name);
      category.setDataValue('slug', slug);
    }
    
  }
}