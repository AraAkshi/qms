import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SurgeryEntity } from './sugery.entity';
import { SurgeonEntity } from './surgeon.entity';

@Entity('past-records')
export class PastRecordsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurgeonEntity, (surgeon) => surgeon.quote)
  surgeon: SurgeonEntity;

  @ManyToOne(() => SurgeryEntity, (surgery) => surgery.quote)
  surgery: SurgeryEntity;

  @Column({ type: 'varchar', nullable: true })
  bedCategory: string;

  @Column({ type: 'varchar' })
  LOS: string;

  @Column({ type: 'float' })
  hospitalFee: number;

  @Column({ type: 'float' })
  consultationFee: number;

  @Column({ nullable: true })
  dischargeDate: Date;
}
