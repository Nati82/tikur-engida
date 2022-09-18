import { Renter } from "src/renter/entities/renter.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Rooms')
export class Room {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column({type: 'array'})
    pictures: string[];

    @Column({type: 'varchar'})
    city: string;

    @Column({type: 'varchar'})
    location: string;

    @OneToOne(() => Renter)
    @JoinColumn()
    renterId: string;

    @Column({type: 'bool'})
    reserved: boolean;

    @Column({type: 'varchar'})
    price: string;

    @Column({type: 'int'})
    beds: number;

    @Column({type: 'int'})
    size: number;

    @Column({type: 'varchar'})
    description: string;
}