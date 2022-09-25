import { Exclude } from 'class-transformer';
import { Renter } from 'src/renter/entities/renter.entity';
import { Tenant } from 'src/tenant/entities/tenat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({ type: 'varchar', array: true })
  pictures: string[];

  @Column({ type: 'varchar', default: 'unknown' })
  roomName: string;

  @Column({ type: 'varchar', default: 'private' })
  companyType: string;

  @Column({ type: 'varchar', default: 'private' })
  companyName: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  location: string;

  @ManyToOne(() => Renter, (renter) => renter.Id)
  renterId: Renter;

  @Exclude()  
  @ManyToOne(() => Tenant, (tenant) => tenant.Id)
  tenantId: Tenant;

  @Column({ type: 'bool', default: 'false' })
  reserved: boolean;

  @Column({ type: 'varchar' })
  price: string;

  @Column({ type: 'int', default: 1 })
  beds: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({type: 'bool', default: false})
  approved: boolean;

  @Column({type: 'timestamp', default: null})
  from: Date;

  @Column({type: 'timestamp', default: null})
  to: Date;
}
