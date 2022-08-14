import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IncrementEntity } from './increment.entity';
import { QuoteEntity } from './quote.entity';

@Entity('surgery')
export class SurgeryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  surgeryName: string;

  @OneToMany(() => QuoteEntity, (quote) => quote.surgery)
  quote: QuoteEntity[];

  @OneToMany(() => IncrementEntity, (increment) => increment.surgery)
  increment: IncrementEntity[];
}
