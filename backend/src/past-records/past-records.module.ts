import { Module, Patch } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PastRecordsEntity } from 'src/entities/pastRecords.entity';
import { PastRecordsController } from './past-records.controller';
import { PastRecordService } from './past-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([PastRecordsEntity])],
  controllers: [PastRecordsController],
  providers: [PastRecordService],
  exports: [PastRecordService],
})
export class PastRecordsModule {}
