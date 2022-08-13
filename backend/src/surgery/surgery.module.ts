import { Module, Patch } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurgeryEntity } from 'src/entities/sugery.entity';
import { SurgeryController } from './surgery.contoller';
import { SurgeryService } from './surgery.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurgeryEntity])],
  controllers: [SurgeryController],
  providers: [SurgeryService],
  exports: [SurgeryService],
})
export class SurgeryModule {}
