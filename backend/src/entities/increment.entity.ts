import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SurgeryEntity } from './sugery.entity';

@Entity('increment')
export class IncrementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  percentageIncrease: number;

  @Column()
  year: number;

  @ManyToOne(() => SurgeryEntity, (surgery) => surgery.increment)
  surgery: SurgeryEntity;
}
