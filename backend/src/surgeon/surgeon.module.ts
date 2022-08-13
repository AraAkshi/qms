import { Module, Patch } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurgeonEntity } from 'src/entities/surgeon.entity';
import { SurgeonController } from './surgeon.contoller';
import { SurgeonService } from './surgeon.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurgeonEntity])],
  controllers: [SurgeonController],
  providers: [SurgeonService],
  exports: [SurgeonService],
})
export class SurgeonModule {}
