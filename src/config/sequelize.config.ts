import { ConfigService } from "@nestjs/config"
import { SequelizeModuleOptions } from "@nestjs/sequelize"
import { Dialect } from "sequelize"
import { Address, Cart, CartItem, CartItemIngredients, Category, Coupon, Ingredient, Order, OrderItem, OrderItemIngredient, Product, ProductIngredient, ProductVariant, Review, User, UserCoupon } from "src/models"


export const sequelizeConfig = (configService: ConfigService) : SequelizeModuleOptions => ({
    database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') ? Number(configService.get<number>('DB_PORT')) : 5432,
        dialect: configService.get<Dialect>('DB_DIALECT') ?? 'postgres',
        synchronize: true,
        autoLoadModels: true,
        logging: false,
        models: [
            User,
            Category,
            Product,
            Cart,
            Ingredient,
            Order,
            OrderItem,
            OrderItemIngredient,
            ProductVariant,
            ProductIngredient,
            Address,
            CartItem,
            CartItemIngredients,
            Coupon,
            UserCoupon,
            Review
        ]
    })