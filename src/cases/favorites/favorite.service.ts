import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite)
        private readonly repo: Repository<Favorite>
    ) {}

    async findByCustomer(customerId: string): Promise<Favorite[]> {
        return this.repo.find({
            where: { customer: { id: customerId } },
            relations: ['product', 'customer']
        });
    }

    async toggle(favorite: Favorite): Promise<void> {
        const existing = await this.repo.findOne({
            where: {
                customer: { id: favorite.customer.id },
                product: { id: favorite.product.id }
            }
        });

        if (existing) {
            // Se já existe, remove (desfavoritar)
            await this.repo.remove(existing);
        } else {
            // Se não existe, adiciona (favoritar)
            await this.repo.save(favorite);
        }
    }
}