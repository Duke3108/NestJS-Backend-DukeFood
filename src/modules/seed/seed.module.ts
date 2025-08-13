import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Category, Ingredient, Product, ProductIngredient, ProductVariant, User } from 'src/models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SequelizeModule.forFeature([User, Category, Product, ProductVariant, Ingredient, ProductIngredient])]
})
export class SeedModule {}
