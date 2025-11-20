import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { CategoryService } from "../categories/category.service";

@Controller("products")
export class ProductController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService
  ) {}

  @Get()
  async findAll(
    @Query("categoryId") categoryId?: string // 🔧 REMOVIDO ParseUUIDPipe
  ): Promise<Product[]> {
    if (categoryId) {
      const category = await this.categoryService.findById(categoryId);

      if (!category) {
        throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
      }

      return this.productService.findAll(category);
    }

    return this.productService.findAll();
  }

  @Get(":id")
  async findById(@Param("id", ParseUUIDPipe) id: string): Promise<Product> {
    const found = await this.productService.findById(id);

    if (!found) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }

    return found;
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.save(product);
  }

  @Put(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() product: Product
  ): Promise<Product> {
    const found = await this.productService.findById(id);

    if (!found) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }

    product.id = id;

    return this.productService.save(product);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.productService.findById(id);

    if (!found) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }

    await this.productService.remove(id);
  }
}
