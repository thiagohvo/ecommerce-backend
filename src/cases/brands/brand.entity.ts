import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('brand') 
export class Brand {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    image: string;
}
