import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/modules/product/dto/createProduct.dto';
import { FilterProductDto } from 'src/modules/product/dto/filterProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get('one/:id')
  async getProductById(@Param('id') id: number) {
    return await this.productService.findOne(id);
  }

  @Get('all')
  async getAllProducts(@Query() filterProductDto: FilterProductDto) {
    return await this.productService.findAll(filterProductDto);
  }

  @Delete('soft/:id')
  async softDeleteProduct(@Param('id') id: number) {
    await this.productService.removeSoft(id);
    return { message: 'Sản phẩm đã bị ẩn' };
  }

  @Delete('hard/:id')
  async hardDeleteProduct(@Param('id') id: number) {
    await this.productService.removeHard(id);
    return { message: 'Sản phẩm đã bị xóa' };
  }
}