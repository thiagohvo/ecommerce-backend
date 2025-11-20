import { Controller, Get, Post, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.entity';

@Controller('favorites')
export class FavoriteController {
    constructor(
        private readonly service: FavoriteService
    ) {}

    @Get()
    async findByCustomer(@Query('customerId') customerId: string) {
        if (!customerId) {
            throw new HttpException('customerId is required', HttpStatus.BAD_REQUEST);
        }
        return this.service.findByCustomer(customerId);
    }

    @Post()
    async toggle(@Body() body: { customer: { id: string }, product: { id: string } }) {
        if (!body.customer?.id || !body.product?.id) {
            throw new HttpException('customer.id and product.id are required', HttpStatus.BAD_REQUEST);
        }

        const favorite = new Favorite();
        favorite.customer = body.customer as any; // ou busque do banco
        favorite.product = body.product as any;   // ou busque do banco

        return this.service.toggle(favorite);
    }
}