import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurgeonEntity } from './entities/surgeon.entity';
import { SurgeryEntity } from './entities/sugery.entity';
import { PatientEntity } from './entities/patient.entity';
import { QuoteEntity } from './entities/quote.entity';
import { UserEntity } from './entities/user.entity';
import { SurgeonModule } from './surgeon/surgeon.module';
import { SurgeryModule } from './surgery/surgery.module';
import { PatientModule } from './patient/patient.module';
import { QuoteModule } from './quote/quote.module';
import { IncrementEntity } from './entities/increment.entity';
import { IncrementModule } from './increment/increment.module';
import { DataSource } from 'typeorm';
import { PackageModule } from './package/package.module';
import { PackageEntity } from './entities/package.entity';
import { PastRecordsEntity } from './entities/pastRecords.entity';
import { PastRecordsModule } from './past-records/past-records.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      host: 'localhost',
      database: 'qms_db',
      password: 'bel123',
      port: 5432,
      entities: [
        SurgeonEntity,
        SurgeryEntity,
        PatientEntity,
        QuoteEntity,
        UserEntity,
        IncrementEntity,
        PackageEntity,
        PastRecordsEntity,
      ],
      synchronize: true,
    }),
    SurgeonModule,
    SurgeryModule,
    PatientModule,
    QuoteModule,
    IncrementModule,
    PackageModule,
    PastRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
