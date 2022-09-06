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

  @Column({ type: 'varchar', nullable: true })
  packageName: string;

  @Column({ type: 'float' })
  hospitalFee: number;

  @Column({ type: 'varchar', nullable: true })
  bedCategory: string;

  @Column({ default: new Date() })
  createdDate: Date;
}
