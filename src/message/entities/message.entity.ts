import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column({type: 'uuid'})
    senderId: string;

    @Column({type: 'uuid'})
    receiverId: string;

    @Column({type: 'varchar', default: 'unknown'})
    senderUsername: string;

    @Column({type: 'varchar', default: 'unknown'})
    receiverUsername: string;

    @Column({type: 'varchar'})
    message: string;

    @Column({type: 'varchar'})
    senderRole: string;

    @Column({type: 'varchar'})
    receiverRole: string;

    @Column({type: 'bool', default: false})
    seen: boolean;

    @Column({type: 'timestamp', default: new Date()})
    date: Date;
}