import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageEntity } from 'src/entities/package.entity';
import { SurgeonEntity } from 'src/entities/surgeon.entity';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PackageService {
  private readonly logger = new Logger(PackageService.name);
  constructor(
    @InjectRepository(PackageEntity)
    private repo: Repository<PackageEntity>,
    private dataSource: DataSource,
  ) {}

  //Get all Packages
  async getAllPackages(): Promise<PackageEntity[]> {
    this.logger.log('Start getting details for all Packages');
    const packages = await this.dataSource
      .getRepository(PackageEntity)
      .createQueryBuilder('package')
      .leftJoinAndSelect('package.surgeon', 'surgeon')
      .leftJoinAndSelect('package.surgery', 'surgery')
      .getMany();

    this.logger.log('Successfully returned All packages');
    return packages;
  }

  //Get One package
  //@params - package Id
  async getOnepackage(packageID: number): Promise<PackageEntity> {
    this.logger.log(`Start getting details for package with Id - ${packageID}`);
    const res = await this.dataSource
      .getRepository(PackageEntity)
      .createQueryBuilder('package')
      .leftJoinAndSelect('package.surgeon', 'surgeon')
      .leftJoinAndSelect('package.surgery', 'surgery')
      .where('package.id = :id')
      .setParameter('id', packageID)
      .getOne();
    this.logger.log(
      `Successfully returned details for package with Id - ${packageID}`,
    );
    return res;
  }

  //Add New package
  async addpackage(data: {
    surgeon: any;
    surgery: any;
    packageName: string;
    hospitalFee: number;
    consultantFee: number;
  }): Promise<PackageEntity> {
    const res = this.repo.create(data);
    await this.repo.save(res);
    this.logger.log(`Successfully Added package - ${res.id}`);

    return res;
  }

  //Edit Existing package Data
  //@params - package id and to edit description
  async editpackage(data: {
    surgeon?: any;
    surgery?: any;
    packageName?: string;
    hospitalFee?: number;
    consultantFee?: number;
    id: number;
  }): Promise<PackageEntity> {
    const res = await this.repo.findOne({ where: { id: data.id } });
    const { surgeon, surgery, packageName, hospitalFee, consultantFee } = data;

    if (surgeon) res.surgeon = surgeon;
    if (surgery) res.surgery = surgery;
    if (packageName) res.packageName = packageName;
    if (hospitalFee) res.hospitalFee = hospitalFee;
    if (consultantFee) res.consultantFee = consultantFee;

    await this.repo.save(res);
    this.logger.log(`Successfully Updated details of package - ${res.id}`);
    return res;
  }

  //Delete package
  //@params - package id
  async deletepackage(data: { id: number }) {
    await this.dataSource
      .getRepository(PackageEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted package with Id - ${data.id}`);
  }

  //Get package for surgeon and surgery
  //@params - surgeon , surgery
  async getpackageForSurgeonSurgery(
    surgeon: any,
    surgery: any,
  ): Promise<PackageEntity[]> {
    this.logger.log(
      `Start getting details of packages for surgeon-${surgeon} and surgery-${surgery}`,
    );
    const res = await this.dataSource
      .getRepository(PackageEntity)
      .createQueryBuilder('package')
      .leftJoinAndSelect('package.surgeon', 'surgeon')
      .leftJoinAndSelect('package.surgery', 'surgery')
      .where('package.surgeon.id= :surgeon')
      .andWhere('package.surgery.id = :surgery')
      .setParameters({ surgeon: surgeon, surgery: surgery })
      .orderBy('package.createdDate')
      .getMany();

    this.logger.log(
      `Successfully returned details of packages for surgeon-${surgeon} and surgery-${surgery}`,
    );
    return res;
  }

  //Get surgeons for surgery
  //@params - surgery
  async getSurgeonsForSurgery(surgery: any): Promise<SurgeonEntity[]> {
    this.logger.log(`Start getting details of packages for surgery-${surgery}`);

    const res = await this.dataSource
      .getRepository(PackageEntity)
      .createQueryBuilder('package')
      .leftJoinAndSelect('package.surgeon', 'surgeon')
      .leftJoinAndSelect('package.surgery', 'surgery')
      .where('package.surgery.id = :surgery')
      .setParameters({ surgery: surgery })
      .orderBy('package.createdDate')
      .getMany();

    this.logger.log(
      `Successfully returned details of packages for surgery-${surgery}`,
    );

    return res.map((item) => item.surgeon);
  }
}
