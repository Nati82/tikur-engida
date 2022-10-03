import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column({type: 'uuid'})
    senderId: string;

    @Column({type: 'uuid'})
    receiverId: string;

    @Column({type: 'varchar'})
    senderUsername: string;

    @Column({type: 'varchar'})
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