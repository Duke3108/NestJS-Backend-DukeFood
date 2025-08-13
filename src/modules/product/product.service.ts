import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Category, Ingredient, Product, ProductIngredient, ProductVariant } from 'src/models';
import { CategoryService } from 'src/modules/category/category.service';
import { CreateProductDto, ProductIngredientDto, ProductVariantDto } from 'src/modules/product/dto/createProduct.dto';
import { FilterProductDto } from 'src/modules/product/dto/filterProduct.dto';
import Helper from 'src/utils/helper';

@Injectable()
export class ProductService {
    constructor(
        private readonly sequelize: Sequelize,
        private readonly categoryService: CategoryService,
        @InjectModel(Product) private readonly productModel: typeof Product,
        @InjectModel(ProductVariant) private readonly productVariantModel: typeof ProductVariant,
        @InjectModel(Ingredient) private readonly ingredientModel: typeof Ingredient,
        @InjectModel(ProductIngredient) private readonly productIngredientModel: typeof ProductIngredient,
        private readonly configService: ConfigService
    ) {}

    async findOne(id: number){
        return await this.productModel.findOne( {
             include: [
                {
                    model: ProductVariant,
                    attributes: {
                        include: [
                        [this.sequelize.literal(`"Product"."basePrice" + "productVariants"."modifiedPrice"`), 'variantPrice']
                    ],
                    exclude: ['createdAt', 'updatedAt', 'productId', 'modifiedPrice'],
                    },

                },
                {
                    model: Category,
                    attributes: ['name', 'slug'],
                },
                {
                    model: ProductIngredient,
                    include: [
                        {model: Ingredient, attributes: {exclude: ['createdAt', 'updatedAt'],}},
                    ],
                    attributes: ['quantity', 'isDefault'],
                },
            ], 
            attributes: {exclude: ['createdAt', 'updatedAt'],},
            where: { id, isActive: true },
            });
    }

    async findOneBySlug(slug: string){
        return await this.productModel.findOne({ where: { slug }, raw: true });
    }

    async create(createProductDto: CreateProductDto) {
        const transaction = await this.sequelize.transaction();
        try {
            const category = await this.categoryService.findOne(createProductDto.categoryId);
            if (!category) {
                throw new BadRequestException('Không tìm thấy danh mục sản phẩm');
            }
            const productSlug = Helper.makeSlugFromString(createProductDto.name);
            const product = await this.findOneBySlug(productSlug);
            if (product) {
                throw new BadRequestException('Sản phẩm đã tồn tại');
            }
            //tao mới sản phẩm
            const payload: Record<string, any> = {
                name: createProductDto.name,
                imageUrl: createProductDto.imageUrl,
                slug: productSlug,
                basePrice: createProductDto.basePrice,
                categoryId: createProductDto.categoryId,
                isFeatured: createProductDto.isFeatured,
            }
            if(createProductDto.description) {
                payload.description = createProductDto.description;
            }
            const newProduct = await this.productModel.create(payload as any, { transaction });
            
            // Tạo các biến thể sản phẩm nếu có
            if(createProductDto.productVariants && createProductDto.productVariants.length > 0) {
                const productId = newProduct.id || newProduct.dataValues.id;
                const productVariants = createProductDto.productVariants.map((productVariant: ProductVariantDto) => ({
                    ...productVariant,
                    productId
                }));
                await this.productVariantModel.bulkCreate(productVariants as any, { transaction });
            }

            // Tạo các nguyên liệu sản phẩm nếu có
            if(createProductDto.productIngredients && createProductDto.productIngredients.length > 0) {
                const productId = newProduct.id || newProduct.dataValues.id;
                const ingredientIds = createProductDto.productIngredients.map((ingredient) => ingredient.ingredientId);
                const alreadyExists = await this.ingredientModel.findAll({
                    where: { id: ingredientIds },
                    attributes: ['id'],
                });
                if(alreadyExists.length !== ingredientIds.length) {
                    throw new BadRequestException('Một số nguyên liệu không tồn tại');
                }
                const productIngredients = createProductDto.productIngredients.map((productIngredients: ProductIngredientDto) => ({
                    ...productIngredients,
                    productId
                }));
                await this.productIngredientModel.bulkCreate(productIngredients as any, { transaction });
            }

            await transaction.commit();

            return {message: 'Tạo sản phẩm thành công', product: newProduct};
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw new BadRequestException(error.message || 'Lỗi khi tạo sản phẩm');
        }
    }

    async findAll(filterProductDto: FilterProductDto){
        const {
            search,
            isActive,
            isFeatured,
            categoryId,
            page,
            limit,
            sortBy,
            sortOrder,
            minPrice,
            maxPrice
        } = filterProductDto;

        const whereClause: any = {};
        if(search !== undefined){
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ]
        }
        if(isActive !== undefined) {
            whereClause.isActive = isActive;
        }
        if(isFeatured !== undefined) {
            whereClause.isFeatured = isFeatured;
        }
        if(categoryId !== undefined) {
            whereClause.categoryId = categoryId;
        }
        if(minPrice !== undefined || maxPrice !== undefined) {
            whereClause.basePrice = {}
            if(minPrice !== undefined) {
                whereClause.basePrice = { [Op.gte]: minPrice };
            }
            if(maxPrice !== undefined) {
                whereClause.basePrice = { [Op.lte]: maxPrice };
            }   
        }

        const limitPage = Number(limit|| this.configService.get<number>('LIMIT_PRODUCT')) ;
        const currentPage = Number(page || 1) ;
        const offset = (currentPage - 1) * limitPage;

        let orderClause: any[] = []
        if(sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]]
        }else{
            orderClause = [['createdAt', 'DESC']]
        }

        const {rows, count} = await this.productModel.findAndCountAll({
            where: whereClause,
            limit: limitPage,
            offset: offset,
            order: orderClause
        })

        const totalItems = Array.isArray(count) ? count.length : count;

        return{
            items: rows,
            pagination:{
                totalItems,
                currentPage,
                limitItemPerPage: limitPage,
                totalPages: Math.ceil(totalItems / limitPage)
            }
        }
    }

    async removeSoft(id: number){
        return await this.productModel.update(
            {isActive: false},
            { where: { id }}
        )
    }

    async removeHard(id: number){
        return await this.productModel.destroy({
            where: { id },
            cascade: true
        })
    }
}
