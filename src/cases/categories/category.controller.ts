import { Param } from "@nestjs/common";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController{
    constructor(private readonly service: CategoryService) {}
    @Get()    
    findAll(): Promise<Category[]>{
        return this.service.findAll();
    }
    @get(':id')
    findById(@Param('id', ParsesUUIDPipe) id: string): Promise<Category> {
    }
}