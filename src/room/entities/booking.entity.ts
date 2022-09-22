import { BookingStatus } from "src/common/booking-status.enum";
import { Tenant } from "src/tenant/entities/tenat.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column({type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING})
    status: BookingStatus;
}