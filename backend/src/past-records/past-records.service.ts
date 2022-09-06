import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PastRecordsEntity } from 'src/entities/pastRecords.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PastRecordService {
  private readonly logger = new Logger(PastRecordService.name);
  constructor(
    @InjectRepository(PastRecordsEntity)
    private repo: Repository<PastRecordsEntity>,
    private dataSource: DataSource,
  ) {}

  //Get all Past Records
  async getAllPastRecords(): Promise<PastRecordsEntity[]> {
    this.logger.log('Start getting details for all Past Records');
    const quotes = await this.dataSource
      .getRepository(PastRecordsEntity)
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.surgeon', 'surgeon')
      .leftJoinAndSelect('record.surgery', 'surgery')
      .getMany();

    this.logger.log('Successfully returned All Past Records');
    return quotes;
  }

  //Get One Record
  //@params - Record Id
  async getOneRecord(recordID: number): Promise<PastRecordsEntity> {
    this.logger.log(`Start getting details for record with Id - ${recordID}`);
    const record = await this.dataSource
      .getRepository(PastRecordsEntity)
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.surgeon', 'surgeon')
      .leftJoinAndSelect('record.surgery', 'surgery')
      .where('record.id = :id')
      .setParameter('id', recordID)
      .getOne();
    this.logger.log(
      `Successfully returned details for record with Id - ${recordID}`,
    );
    return record;
  }

  //Add New Record
  async addRecord(data: {
    surgeon: any;
    surgery: any;
    bedCategory: string;
    LOS: string;
    hospitalFee: number;
    consultationFee: number;
    dischargeDate: Date;
  }): Promise<PastRecordsEntity> {
    const record = this.repo.create(data);
    await this.repo.save(record);
    this.logger.log(`Successfully Added record - ${record.id}`);

    return record;
  }

  //Edit Existing Record Data
  //@params - Record id and to edit description
  async editRecord(data: {
    surgeon?: any;
    surgery?: any;
    bedCategory?: string;
    LOS?: string;
    hospitalFee?: number;
    consultationFee?: number;
    dischargeDate?: Date;
    id: number;
  }): Promise<PastRecordsEntity> {
    const record = await this.repo.findOne({ where: { id: data.id } });
    const {
      surgeon,
      surgery,
      bedCategory,
      LOS,
      hospitalFee,
      consultationFee,
      dischargeDate,
    } = data;

    if (surgeon) record.surgeon = surgeon;
    if (surgery) record.surgery = surgery;
    if (bedCategory) record.bedCategory = bedCategory;
    if (LOS) record.LOS = LOS;
    if (hospitalFee) record.hospitalFee = hospitalFee;
    if (consultationFee) record.consultationFee = consultationFee;
    if (dischargeDate) record.dischargeDate = dischargeDate;

    await this.repo.save(record);
    this.logger.log(`Successfully Updated details of record - ${record.id}`);
    return record;
  }

  //Delete record
  //@params - record id
  async deleteRecord(data: { id: number }) {
    await this.dataSource
      .getRepository(PastRecordsEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted record with Id - ${data.id}`);
  }

  //Get records for surgeon and surgery
  //@params - surgeon , surgery
  async getRecordForSurgeonSurgery(
    surgeon: any,
    surgery: any,
  ): Promise<PastRecordsEntity[]> {
    this.logger.log(
      `Start getting details of Records for surgeon-${surgeon} and surgery-${surgery}`,
    );
    const res = await this.dataSource
      .getRepository(PastRecordsEntity)
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.surgeon', 'surgeon')
      .leftJoinAndSelect('record.surgery', 'surgery')
      .where('record.surgeon.id= :surgeon')
      .andWhere('record.surgery.id = :surgery')
      .setParameters({ surgeon: surgeon, surgery: surgery })
      .orderBy('record.dischargeDate')
      .getMany();

    this.logger.log(
      `Successfully returned details of records for surgeon-${surgeon} and surgery-${surgery}`,
    );
    return res;
  }
}
