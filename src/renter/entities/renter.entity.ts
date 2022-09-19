import { Exclude } from "class-transformer";
import { Role } from "src/common/roles.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Renters')
export class Renter {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column({type: 'varchar'})
    username: string;

    @Column({type: 'varchar'})
    firstName: string;

    @Column({type: 'varchar'})
    lastName: string;

    @Exclude()
    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'varchar'})
    phoneNo: string;

    @Column({type: 'varchar'})
    profilePic: string;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'bool', default: false})
    status: boolean;

    @Column({type: "enum", enum: Role, default: Role.RENTER})
    role: Role;
    
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date
}