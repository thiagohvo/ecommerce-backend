import { promises } from "dns";
import { Brand } from "./brand.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private repository: Repository<Brand>
  ) {}

  findAll(): Promise<Brand[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Brand | null> {
    return this.repository.findOneBy({ id });
  }

  save(category: Brand): Promise<Brand> {
    return this.repository.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID "${id}" not found`);
    }
  }
}
