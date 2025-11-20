import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CustomerModule } from '../customers/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    CustomerModule,   // 👈 ADICIONE ISSO
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
