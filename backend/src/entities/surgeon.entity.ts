import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PackageEntity } from './package.entity';
import { PastRecordsEntity } from './pastRecords.entity';
import { QuoteEntity } from './quote.entity';

@Entity('surgeon')
export class SurgeonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  surgeonName: string;

  @OneToMany(() => QuoteEntity, (quote) => quote.surgeon)
  quote: QuoteEntity[];

  @OneToMany(() => PackageEntity, (item) => item.surgeon)
  package: PackageEntity[];

  @OneToMany(() => PastRecordsEntity, (item) => item.surgeon)
  pastRecords: PastRecordsEntity[];
}
