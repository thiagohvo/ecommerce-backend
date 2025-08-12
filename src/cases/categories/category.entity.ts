import { Entity } from "typeorm";

@Entity ('Category')
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 60, nullable: false })
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;
}