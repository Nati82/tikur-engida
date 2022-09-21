import { Tenant } from "src/tenant/entities/tenat.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity('Comments')
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @ManyToOne(() => Tenant, (tenant) => tenant.Id)
    tenantId: Tenant;

    @ManyToOne(() => Room, (room) => room.Id)
    roomId: Room;

    @Column({type: 'varchar'})
    comment: string;

    @Column({type: 'timestamp', default: new Date()})
    date: Date;
}