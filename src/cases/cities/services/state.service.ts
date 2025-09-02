import { promises } from "dns";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { State } from "../entities/state.entity";

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private repository: Repository<State>
  ) {}

  findAll(): Promise<State[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<State | null> {
    return this.repository.findOneBy({ id });
  }

  save(category: State): Promise<State> {
    return this.repository.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`State with ID "${id}" not found`);
    }
  }
}
