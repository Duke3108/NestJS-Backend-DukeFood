import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category, Ingredient, Product, ProductIngredient, ProductVariant, User } from 'src/models';
import { categories, combos, ingredients, productIngredients, products, productVariants, users } from 'src/modules/seed/data';
import * as bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';


@Injectable()
export class SeedService {
    constructor(@InjectModel(User) private userModel: typeof User,
                @InjectModel(Category) private categoryModel: typeof Category,
                @InjectModel(Product) private productModel: typeof Product,
                @InjectModel(ProductVariant) private productVariantModel: typeof ProductVariant,
                @InjectModel(Ingredient) private ingredientModel: typeof Ingredient,
                @InjectModel(ProductIngredient) private productIngredientModel: typeof ProductIngredient,
                private readonly sequilize: Sequelize
            ) {}

    private async seedUsers(transaction: Transaction) {
        const userWithHashPassword = users.map(user => {
            const hasedPassword = bcrypt.hashSync(user.password, 10);
            return {
                ...user,
                password: hasedPassword,
            };
        })
        return this.userModel.bulkCreate(userWithHashPassword as any, { transaction });
    }

    private async seedCategories(transaction: Transaction) {
        return this.categoryModel.bulkCreate(categories as any, { transaction });
    }

    private async seedProducts(transaction: Transaction) {
        const allProducts = [...products, ...combos]
        return this.productModel.bulkCreate(allProducts as any, { transaction });
    }

    private async seedIngredients(transaction: Transaction) {
        return this.ingredientModel.bulkCreate(ingredients as any, { transaction });
    }

    private async productVariantSeed(transaction: Transaction) {
        return this.productVariantModel.bulkCreate(productVariants as any, { transaction });
    }

    private async productIgredientSeed(transaction: Transaction) {
        return this.productIngredientModel.bulkCreate(productIngredients as any, { transaction });
    }

    async initSeedData(){
        const transaction = await this.sequilize.transaction();
        try {
            await this.seedUsers(transaction);
            await this.seedCategories(transaction);
            await this.seedProducts(transaction);
            await this.seedIngredients(transaction);
            await this.productVariantSeed(transaction);
            await this.productIgredientSeed(transaction);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Error seeding data:', error);
            throw new BadRequestException('Seeding failed');
        }
    }
}
