import { promises } from "dns";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { City } from "../entities/city.entity";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private repository: Repository<City>
  ) {}

  findAll(): Promise<City[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<City | null> {
    return this.repository.findOneBy({ id });
  }

  save(category: City): Promise<City> {
    return this.repository.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`City with ID "${id}" not found`);
    }
  }
}
