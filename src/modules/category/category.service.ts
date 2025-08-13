import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/models';
import { CreateCategoryDto } from 'src/modules/category/dto/createCategory.dto';
import { UpdateCategoryDto } from 'src/modules/category/dto/updateCategory.dto';
import Helper from 'src/utils/helper';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category) private readonly categoryModel: typeof Category
    ){}

    async create(createCategoryDto: CreateCategoryDto){
        const alreadyExists = await this.categoryModel.findOne({
            where: { 
                slug: Helper.makeSlugFromString(createCategoryDto.name)
            }
        })
        if(alreadyExists) {
            throw new BadRequestException('Danh mục món ăn đã tồn tại')
        }
        await this.categoryModel.create(createCategoryDto as any);
        return 
    }

    async findAll(){
        return await this.categoryModel.findAll(
            {
                where: {
                    isActive: true
                },
                order: [['sortOrder', 'ASC']],
                attributes: ['id', 'name', 'description', 'sortOrder', 'isActive', 'slug']
            }
        )
    }

    async findOne(id: number){
        return await this.categoryModel.findByPk(id, {raw: true})
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto){
        const alreadyExists = await this.categoryModel.findByPk(id)
        if(!alreadyExists) {
            throw new BadRequestException('Danh mục món ăn không tồn tại')
        }
        await alreadyExists.update(updateCategoryDto)

        return { message: 'Cập nhật thành công' };
    }

    async delete(id: number){
        await this.categoryModel.destroy( { where: { id }, cascade: true } );
        return { message: 'Xóa thành công' };
    }
}