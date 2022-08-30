import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurgeryEntity } from 'src/entities/sugery.entity';
import { DataSource, getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class SurgeryService {
  private readonly logger = new Logger(SurgeryService.name);
  constructor(
    @InjectRepository(SurgeryEntity)
    private repo: Repository<SurgeryEntity>,
    private dataSource: DataSource,
  ) {}

  //Get all surgerys
  async getAllSurgerys(): Promise<SurgeryEntity[]> {
    this.logger.log('Start getting details for all surgerys');
    const surgerys = await this.dataSource
      .getRepository(SurgeryEntity)
      .createQueryBuilder('surgery')
      .getMany();

    this.logger.log('Successfully returned All surgerys');
    return surgerys;
  }

  //Get One surgery
  //@params - surgery Id
  async getOnesurgery(surgeryID: number): Promise<SurgeryEntity> {
    this.logger.log(`Start getting details for surgery with Id - ${surgeryID}`);
    const surgery = await this.dataSource
      .getRepository(SurgeryEntity)
      .createQueryBuilder('surgery')
      .where('surgery.id = :id')
      .setParameter('id', surgeryID)
      .getOne();
    this.logger.log(
      `Successfully returned details for surgery with Id - ${surgeryID}`,
    );
    return surgery;
  }

  //Add New surgery
  async addsurgery(data: { surgeryName: string }): Promise<SurgeryEntity> {
    const surgery = this.repo.create(data);
    await this.repo.save(surgery);
    this.logger.log(`Successfully Added surgery - ${surgery.surgeryName}`);
    return surgery;
  }

  //Edit Existing surgery Data
  //@params - Animal id and to edit description
  async editsurgerys(data: {
    surgeryName?: string;
    id: number;
  }): Promise<SurgeryEntity> {
    const surgery = await this.repo.findOne({ where: { id: data.id } });
    const { surgeryName } = data;

    if (surgeryName) surgery.surgeryName = surgeryName;

    await this.repo.save(surgery);
    this.logger.log(
      `Successfully Updated details of surgery - ${surgery.surgeryName}`,
    );
    return surgery;
  }

  //Delete surgery
  //@params - surgery id
  async deletesurgerys(data: { id: number }) {
    await this.dataSource
      .getRepository(SurgeryEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted surgery with Id - ${data.id}`);
  }
}
