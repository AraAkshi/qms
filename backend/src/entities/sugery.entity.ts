import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IncrementEntity } from './increment.entity';
import { PackageEntity } from './package.entity';
import { PastRecordsEntity } from './pastRecords.entity';
import { QuoteEntity } from './quote.entity';

@Entity('surgery')
export class SurgeryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  surgeryName: string;

  @OneToMany(() => QuoteEntity, (quote) => quote.surgery)
  quote: QuoteEntity[];

  @OneToMany(() => PackageEntity, (item) => item.surgery)
  package: PackageEntity[];

  @OneToMany(() => PastRecordsEntity, (item) => item.surgery)
  pastRecords: PastRecordsEntity[];

  @OneToMany(() => IncrementEntity, (increment) => increment.surgery)
  increment: IncrementEntity[];
}
