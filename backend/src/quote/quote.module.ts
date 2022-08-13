import { Module, Patch } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteEntity } from 'src/entities/quote.entity';
import { QuoteController } from './quote.contoller';
import { QuoteService } from './quote.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteEntity])],
  controllers: [QuoteController],
  providers: [QuoteService],
  exports: [QuoteService],
})
export class QuoteModule {}
