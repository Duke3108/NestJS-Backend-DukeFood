import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/modules/category/dto/createCategory.dto';
import { UpdateCategoryDto } from 'src/modules/category/dto/updateCategory.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Tạo mới danh mục thành công' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Danh mục đã tồn tại' })
  @ApiOperation({ summary: 'Tạo mới danh mục món ăn (admin only)' })
  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllCategories() {
    return await this.categoryService.findAll()
  }

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) id:number) {
    return await this.categoryService.findOne(id)
  }

  @Patch('update/:id')
  async update(@Body() updateCategoryDto: UpdateCategoryDto, @Param('id') id: number) {
    return await this.categoryService.update(id, updateCategoryDto)
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.categoryService.delete(id)
  }
}
