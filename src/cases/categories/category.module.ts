import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";
import { CategoryController } from "./category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}