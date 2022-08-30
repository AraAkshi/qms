import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncrementEntity } from 'src/entities/increment.entity';
import { DataSource, getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class IncrementService {
  private readonly logger = new Logger(IncrementService.name);
  constructor(
    @InjectRepository(IncrementEntity)
    private repo: Repository<IncrementEntity>,
    private dataSource: DataSource,
  ) {}

  //Get all Increments
  async getAllIncrements(): Promise<IncrementEntity[]> {
    this.logger.log('Start getting details for all Increments');
    const increments = await this.dataSource
      .getRepository(IncrementEntity)
      .createQueryBuilder('increment')
      .getMany();

    this.logger.log('Successfully returned All Increments');
    return increments;
  }

  //Get One Increment
  //@params - Increment Id
  async getOneIncrement(IncrementID: number): Promise<IncrementEntity> {
    this.logger.log(
      `Start getting details for Increment with Id - ${IncrementID}`,
    );
    const increment = await this.dataSource
      .getRepository(IncrementEntity)
      .createQueryBuilder('increment')
      .where('increment.id = :id')
      .setParameter('id', IncrementID)
      .getOne();
    this.logger.log(
      `Successfully returned details for Increment with Id - ${IncrementID}`,
    );
    return increment;
  }

  //Add New Increment
  async addIncrement(data: {
    percentageIncrease: number;
    year: number;
    surgery: any;
  }): Promise<IncrementEntity> {
    const increment = this.repo.create(data);
    await this.repo.save(increment);

    this.logger.log(`Successfully Added increment - ${increment.id}`);
    return increment;
  }

  //Edit Existing Increment Data
  //@params - Animal id and to edit description
  async editIncrement(data: {
    percentageIncrease?: number;
    year?: number;
    surgery?: any;
    id: number;
  }): Promise<IncrementEntity> {
    const increment = await this.repo.findOne({ where: { id: data.id } });
    const { percentageIncrease, year, surgery } = data;

    if (percentageIncrease) increment.percentageIncrease = percentageIncrease;
    if (year) increment.year = year;
    if (surgery) increment.surgery = surgery;

    await this.repo.save(increment);
    this.logger.log(
      `Successfully Updated details of increment - ${increment.id}`,
    );
    return increment;
  }

  //Delete Increment
  //@params - Increment id
  async deleteIncrement(data: { id: number }) {
    await this.dataSource
      .getRepository(IncrementEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted Increment with Id - ${data.id}`);
  }
}
