import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuoteEntity } from './quote.entity';

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  patientName: string;

  @Column()
  patientNo: number;

  @Column({ type: 'varchar', nullable: true })
  pid: string;

  @OneToMany(() => QuoteEntity, (quote) => quote.patient)
  quote: QuoteEntity[];
}
