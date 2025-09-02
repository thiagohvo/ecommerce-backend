import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CityService } from "../cities/services/city.service";
import { City } from "../cities/entities/city.entity";


@Controller('cities')
export class CityController {
  constructor(
    private service: CityService
  ) {}

  @Get()
  findAll(): Promise<City[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<City> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    return found;
  }

  @Post()
  create(@Body() citie: City): Promise<City> {
    return this.service.save(citie);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() citie: City
  ): Promise<City> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    citie.id = id;

    return this.service.save(citie);
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('City not found', HttpStatus.NOT_FOUND);
    }

    await this.service.remove(id);
  }
}
