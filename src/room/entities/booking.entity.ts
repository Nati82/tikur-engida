import { Tenant } from "src/tenant/entities/tenat.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => Room, (room) => room.Id)
    @JoinColumn()
    roomId: string;

    @ManyToOne(() => Tenant, (tenant) => tenant.Id)
    @JoinColumn()
    tenantId: string;
}