import { Table,Model, Column, DataType, HasMany, HasOne, BeforeValidate } from 'sequelize-typescript';
import { Address } from 'src/models/address.model';
import { Cart } from 'src/models/cart.model';
import { Order } from 'src/models/order.model';
import { Review } from 'src/models/review.model';
import { UserCoupon } from 'src/models/userCoupon.model';
import * as bcrypt from 'bcryptjs';

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  avatar: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    allowNull: false,
    defaultValue: UserRole.CUSTOMER,
    type: DataType.ENUM(...Object.values(UserRole)),
  })
  role: UserRole;


  //Relationships
  @HasMany(() => Address)
  addresses: Address[]

  @HasMany(() => Order)
  orders: Order[]

  @HasOne(() => Cart)
  cart: Cart[]

  @HasMany(() => UserCoupon)
  userCoupons: UserCoupon[]

  @HasMany(() => Review)
  reviews: Review[]

   comparePassword(password: string) {
    const {password: passwordInDb} = this.get({ plain: true });
    return  bcrypt.compareSync(password, passwordInDb);
  }

  getUserWithoutPassword() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = this.get({ plain: true });
    return rest;
  }

  @BeforeValidate
  static hashPassword(user: User) {
    if(user.isNewRecord) {
      const password = user.get('password')
      const hashPassword = bcrypt.hashSync(password, 10);
      user.setDataValue('password', hashPassword);
    }
  }
}