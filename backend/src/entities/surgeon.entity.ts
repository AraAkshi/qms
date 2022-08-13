import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuoteEntity } from './quote.entity';

@Entity('surgeon')
export class SurgeonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  surgeonName: string;

  @OneToMany(() => QuoteEntity, (quote) => quote.surgeon)
  quote: QuoteEntity[];
}
