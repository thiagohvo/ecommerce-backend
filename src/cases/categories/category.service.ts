import { promises } from "dns";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>
    ) {}

findAll():Promise<Category[]>{
    return this.repository.find();


}

findById(id: string): Promise<Category> {
    return this.repository.findOneBy({id: id});


}

save(category: Category): Promise<Category> {
    return this.repository.save(category);


}

async remove(id: string): Promise<void> {
    return this.repository.delete(id);
    
}
    
}