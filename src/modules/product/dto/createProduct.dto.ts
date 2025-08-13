import { ArrayNotRequired, BooleanNotRequired, EnumRequired, NumberRequired, StringNotRequired, StringRequired } from "src/common/decorators";
import { ProductVariantSize, ProductVariantType } from "src/models";

export class ProductVariantDto {
    @StringRequired('Tên biến thể')
    name: string;

    @EnumRequired(ProductVariantSize, 'Kích thước biến thể')
    size: ProductVariantSize

    @EnumRequired(ProductVariantType, 'Loại biến thể')
    type: ProductVariantType

    @NumberRequired('Giá biến thể')
    modifiedPrice: number;
}

export class ProductIngredientDto {
    @NumberRequired('Id nguyên liệu', 1)
    ingredientId: number;

    @NumberRequired('Số lượng nguyên liệu', 1)
    quantity: number;

    @BooleanNotRequired
    isDefault?: boolean;
}

export class CreateProductDto {
    @StringRequired('Tên sản phẩm')
    name: string;

    @StringRequired('URL hình ảnh sản phẩm')
    imageUrl: string;

    @StringNotRequired
    description?: string;

    @NumberRequired('Giá sản phẩm')
    basePrice: number;

    @NumberRequired('Id danh mục sản phẩm', 1)
    categoryId: number;

    @BooleanNotRequired
    isFeatured?: boolean;

    @ArrayNotRequired(ProductVariantDto)
    productVariants?: ProductVariantDto[];

    @ArrayNotRequired(ProductIngredientDto)
    productIngredients?: ProductIngredientDto[];
}

