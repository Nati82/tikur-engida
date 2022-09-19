import { Tenant } from "src/tenant/entities/tenat.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity('Bookings')
export class Booking {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column({type: 'date'})
    from: Date;

    @Column({type: 'date'})
    to: Date;

    @Column({type: 'date', default: new Date()})
    date: Date;

    @OneToOne(() => Room)
    @JoinColumn()
    roomId: string;

    @OneToOne(() => Tenant)
    @JoinColumn()
    tenantId: string;
}