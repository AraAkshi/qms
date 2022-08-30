import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { SurgeryEntity } from './sugery.entity';
import { SurgeonEntity } from './surgeon.entity';

@Entity('package')
export class PackageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurgeonEntity, (surgeon) => surgeon.quote)
  surgeon: SurgeonEntity;

  @ManyToOne(() => SurgeryEntity, (surgery) => surgery.quote)
  surgery: SurgeryEntity;

  @Column()
  package1: number;

  @Column()
  package2: number;

  @Column()
  package3: number;

  @Column({ default: new Date() })
  createdDate: Date;
}
