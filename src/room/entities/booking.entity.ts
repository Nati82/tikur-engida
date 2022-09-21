import { Tenant } from "src/tenant/entities/tenat.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity('Bookings')
export class Booking {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column({type: 'timestamp'})
    from: Date;

    @Column({type: 'timestamp'})
    to: Date;

    @Column({type: 'timestamp', default: new Date()})
    date: Date;

    @ManyToOne(() => Room, (room) => room.Id)
    roomId: Room;

    @ManyToOne(() => Tenant, (tenant) => tenant.Id)
    tenantId: Tenant;
}