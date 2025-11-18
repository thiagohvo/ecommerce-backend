import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Customer } from "../customers/customer.entity";

@Injectable() //permite a injeção no controller
export class OrderService {

    constructor(
      @InjectRepository(Order)
      private repository: Repository<Order>
    ) {}

   //service/provider retorna uma promise
       findAll(customer?: Customer): Promise<Order[]> {
         if (!customer) {
           return this.repository.find();
         } else {
           return this.repository.find({
             where: {customer: customer}});
         } 
       }

    findByID(id: string):Promise<Order | null> {
      return this.repository.findOneBy({id: id});
    }

    Save(order: Order): Promise<Order> {
    //PERSISTE, não insiro, nem altero, pode ser os dois
      return this.repository.save(order);
    }

    async Remove(id: string): Promise<void> {
      await this.repository.delete({id});
    }

}