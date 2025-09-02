import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../cities/entities/city.entity";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;

    @Column({ length: 250, nullable: true })
    address: string;

    @Column({ length: 8, nullable: true })
    zipcode: string;
    
    @ManyToOne(() => City, { eager: true, nullable: true })
    @JoinColumn({ name: 'city_id' })
    city: City;
}