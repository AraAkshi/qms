import { Dependencies, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurgeonEntity } from 'src/entities/surgeon.entity';
import { DataSource, getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class SurgeonService {
  private readonly logger = new Logger(SurgeonService.name);
  constructor(
    @InjectRepository(SurgeonEntity)
    private repo: Repository<SurgeonEntity>,
    private dataSource: DataSource,
  ) {}

  //Get all surgeons
  async getAllSurgeons(): Promise<SurgeonEntity[]> {
    this.logger.log('Start getting details for all surgeons');
    const surgeons = await this.dataSource
      .getRepository(SurgeonEntity)
      .createQueryBuilder('surgeon')
      .getMany();

    this.logger.log('Successfully returned All surgeons');
    return surgeons;
  }

  //Get One surgeon
  //@params - surgeon Id
  async getOnesurgeon(surgeonID: number): Promise<SurgeonEntity> {
    this.logger.log(`Start getting details for surgeon with Id - ${surgeonID}`);
    const surgeon = await this.dataSource
      .getRepository(SurgeonEntity)
      .createQueryBuilder('surgeon')
      .where('surgeon.id = :id')
      .setParameter('id', surgeonID)
      .getOne();
    this.logger.log(
      `Successfully returned details for surgeon with Id - ${surgeonID}`,
    );
    return surgeon;
  }

  //Add New surgeon
  async addsurgeon(data: { surgeonName: string }): Promise<SurgeonEntity> {
    const surgeon = this.repo.create(data);
    await this.repo.save(surgeon);
    this.logger.log(`Successfully Added surgeon - ${surgeon.surgeonName}`);
    return surgeon;
  }

  //Edit Existing surgeon Data
  //@params - Animal id and to edit description
  async editsurgeons(data: {
    surgeonName?: string;
    id: number;
  }): Promise<SurgeonEntity> {
    const surgeon = await this.repo.findOne({ where: { id: data.id } });
    const { surgeonName } = data;

    if (surgeonName) surgeon.surgeonName = surgeonName;

    await this.repo.save(surgeon);
    this.logger.log(
      `Successfully Updated details of surgeon - ${surgeon.surgeonName}`,
    );
    return surgeon;
  }

  //Delete surgeon
  //@params - surgeon id
  async deletesurgeons(data: { id: number }) {
    await this.dataSource
      .getRepository(SurgeonEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted surgeon with Id - ${data.id}`);
  }
}
