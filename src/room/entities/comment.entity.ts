import { Tenant } from "src/tenant/entities/tenat.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity('Comments')
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @ManyToOne(() => Tenant, (tenant) => tenant.Id)
    @JoinColumn()
    tenantId: string;

    @ManyToOne(() => Room, (room) => room.Id)
    @JoinColumn()
    roomId: string;

    @Column({type: 'varchar'})
    comment: string;

    @Column({type: 'date', default: new Date()})
    date: Date;
}