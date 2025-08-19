import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandService } from "./brand.service";
import { Brand } from "./brand.entity";
import { BrandController } from "./brand.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Brand])],
    controllers: [BrandController],
    providers: [BrandService],
})
export class BrandModule {}