import { Module, Patch } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncrementEntity } from 'src/entities/increment.entity';
import { IncrementController } from './increment.contoller';
import { IncrementService } from './increment.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncrementEntity])],
  controllers: [IncrementController],
  providers: [IncrementService],
  exports: [IncrementService],
})
export class IncrementModule {}
