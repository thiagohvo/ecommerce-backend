import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CategoryModule } from './cases/categories/category.module';
import { BrandModule } from './cases/brands/brand.module';
import { ProductModule } from './cases/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('Tentando conectar em:', configService.get('DB_HOST'));
        
        return {
          type: configService.get<'postgres'>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<number>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
         
          ssl: configService.get('DB_SSL') === 'true' ? {
            rejectUnauthorized: false,
           
          } : false,
         
          extra: {
            ssl: configService.get('DB_SSL') === 'true' ? {
              rejectUnauthorized: false,
            } : false,
          },
        
          poolSize: 10,
          connectionTimeoutMillis: 10000,
          idleTimeoutMillis: 30000,
        };
      },
    }),
    CategoryModule,
    BrandModule,
    ProductModule,
  ],
})
export class AppModule {}