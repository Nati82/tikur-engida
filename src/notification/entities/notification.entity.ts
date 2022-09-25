import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NotificationType } from "../notification-type.enum";

@Entity('Notifications')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column({type: 'varchar'})
    receiverId: string;

    @Column({type: 'enum', enum: NotificationType })
    type: NotificationType;

    @Column({type: 'boolean', default: false})
    seen: boolean;

    @Column({type: 'timestamp', default: new Date()})
    date: Date;
}