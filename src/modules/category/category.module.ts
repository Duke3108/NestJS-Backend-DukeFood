import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/models';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [SequelizeModule.forFeature([Category]), AuthModule],
  exports: [CategoryService]
})
export class CategoryModule {}
