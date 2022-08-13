import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { SurgeryEntity } from './sugery.entity';
import { SurgeonEntity } from './surgeon.entity';

@Entity('quote')
export class QuoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatientEntity, (patient) => patient.quote)
  patient: PatientEntity;

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

  @Column({ type: 'varchar' })
  selectedPackage: string;

  @Column()
  actualPrice: number;

  @Column({ default: false })
  isAdmitted: boolean;

  @Column({ default: new Date() })
  quotedDate: Date;
}
