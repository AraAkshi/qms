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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      host: 'localhost',
      database: 'qms_db',
      password: 'bel123',
      // "password": 'Belpostgre@123',
      port: 5432,
      entities: [
        SurgeonEntity,
        SurgeryEntity,
        PatientEntity,
        QuoteEntity,
        UserEntity,
      ],
      synchronize: true,
    }),
    SurgeonModule,
    SurgeryModule,
    PatientModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
