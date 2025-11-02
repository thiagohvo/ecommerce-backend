import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { CategoryModule } from '../categories/category.module';


@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoryModule, TypeOrmModule,],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}