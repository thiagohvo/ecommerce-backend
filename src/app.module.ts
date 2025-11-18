import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './cases/cities/city.module';
import { CustomerModule } from './cases/customers/customer.module';
import { OrderModule } from './cases/orders/order.module';

@Module ({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
      // ^pega tudo que tem no modelo de entidade que foi carregado atrás do autoLoadEntities
      // e replica no banco SÓ DA PRA USAR EM DESENVOLVIMENTO, N CONECTA EM PRODUÇÃO COM SYNCHRONIZE TRUE   
    }),
    CategoryModule, 
    BrandModule,
    ProductModule,
    CityModule,
    CustomerModule,
    OrderModule
  ],
})

export class AppModule {}