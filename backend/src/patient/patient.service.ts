import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from 'src/entities/patient.entity';
import { DataSource, getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  constructor(
    @InjectRepository(PatientEntity)
    private repo: Repository<PatientEntity>,
    private dataSource: DataSource,
  ) {}

  //Get all Patients
  async getAllPatients(): Promise<PatientEntity[]> {
    this.logger.log('Start getting details for all Patients');
    const patients = await this.dataSource
      .getRepository(PatientEntity)
      .createQueryBuilder('patient')
      .getMany();

    this.logger.log('Successfully returned All Patients');
    return patients;
  }

  //Get One Patient
  //@params - Patient Id
  async getOnePatient(patientID: number): Promise<PatientEntity> {
    this.logger.log(`Start getting details for patient with Id - ${patientID}`);
    const patient = await this.dataSource
      .getRepository(PatientEntity)
      .createQueryBuilder('patient')
      .where('patient.id = :id')
      .setParameter('id', patientID)
      .getOne();
    this.logger.log(
      `Successfully returned details for patient with Id - ${patientID}`,
    );
    return patient;
  }

  //Add New Patient
  async addPatient(data: {
    patientName: string;
    patientNo: number;
    pid: string;
  }): Promise<PatientEntity> {
    const patient = this.repo.create(data);
    await this.repo.save(patient);
    this.logger.log(`Successfully Added patient - ${patient.patientName}`);
    return patient;
  }

  //Edit Existing Patient Data
  //@params - Animal id and to edit description
  async editPatients(data: {
    patientName?: string;
    patientNo?: number;
    pid?: string;
    id: number;
  }): Promise<PatientEntity> {
    const patient = await this.repo.findOne({ where: { id: data.id } });
    const { patientName, patientNo, pid } = data;

    if (patientName) patient.patientName = patientName;
    if (patientNo) patient.patientNo = patientNo;
    if (pid) patient.pid = pid;

    await this.repo.save(patient);
    this.logger.log(
      `Successfully Updated details of patient - ${patient.patientName}`,
    );
    return patient;
  }

  //Delete Patient
  //@params - patient id
  async deletepatients(data: { id: number }) {
    await this.dataSource
      .getRepository(PatientEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted patient with Id - ${data.id}`);
  }
}
