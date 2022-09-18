import { Tenant } from "src/tenant/entities/tenat.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity('Comments')
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @OneToOne(() => Tenant)
    @JoinColumn()
    tenantId: string;

    @OneToOne(() => Room)
    @JoinColumn()
    roomId: string;

    @Column({type: 'varchar'})
    comment: string;

    @Column({type: 'date'})
    date: Date;
}