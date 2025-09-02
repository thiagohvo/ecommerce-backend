import { promises } from "dns";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "../categories/category.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>
  ) {}

  findAll(category?: Category): Promise<Product[]> {
    if (!category) {
      return this.repository.find();
    } else {
      return this.repository.find({ where: { category: category } });
    }
  }

  findById(id: string): Promise<Product | null> {
    return this.repository.findOneBy({ id });
  }

  save(category: Product): Promise<Product> {
    return this.repository.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }
}
