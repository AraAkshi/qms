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

  @Column({ type: 'varchar', nullable: true })
  bedCategory: string;

  @Column({ type: 'float', nullable: true })
  hospitalFee: number;

  @Column({ type: 'float', nullable: true })
  consultationFee: number;

  @Column({ type: 'float', nullable: true })
  actualPrice: number;

  @Column({ nullable: true })
  remark: string;

  @Column({ default: new Date() })
  quotedDate: Date;
}
