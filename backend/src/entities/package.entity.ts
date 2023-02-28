import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SurgeryEntity } from './sugery.entity';
import { SurgeonEntity } from './surgeon.entity';

@Entity('package')
export class PackageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurgeonEntity, (surgeon) => surgeon.package)
  surgeon: SurgeonEntity;

  @ManyToOne(() => SurgeryEntity, (surgery) => surgery.package)
  surgery: SurgeryEntity;

  @Column({ type: 'varchar', nullable: true })
  packageName: string;

  @Column({ type: 'float', nullable: true })
  hospitalFee: number;

  @Column({ type: 'float', nullable: true })
  consultantFee: number;

  @Column({ default: new Date() })
  createdDate: Date;
}
