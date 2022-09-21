import { Renter } from 'src/renter/entities/renter.entity';
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

  @Column({ type: 'varchar', default: 'private' })
  companyType: string;

  @Column({ type: 'varchar', default: 'private' })
  companyName: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  location: string;

  @ManyToOne(() => Renter, (renter) => renter.Id)
  @JoinColumn()
  renterId: string;

  @Column({ type: 'bool', default: 'false' })
  reserved: boolean;

  @Column({ type: 'varchar' })
  price: string;

  @Column({ type: 'int' })
  rooms: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({type: 'bool', default: false})
  approved: boolean;

  @Column({type: 'date', default: null})
  from: Date;

  @Column({type: 'date', default: null})
  to: Date;
}
