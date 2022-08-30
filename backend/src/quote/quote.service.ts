import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuoteEntity } from 'src/entities/quote.entity';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);
  constructor(
    @InjectRepository(QuoteEntity)
    private repo: Repository<QuoteEntity>,
  ) {}

  //Get all Quotes
  async getAllQuotes(): Promise<QuoteEntity[]> {
    this.logger.log('Start getting details for all Quotes');
    const quotes = await getRepository(QuoteEntity)
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.patient', 'patient')
      .leftJoinAndSelect('quote.surgeon', 'surgeon')
      .leftJoinAndSelect('quote.surgery', 'surgery')
      .getMany();

    this.logger.log('Successfully returned All quotes');
    return quotes;
  }

  //Get One Quote
  //@params - Quote Id
  async getOneQuote(quoteID: number): Promise<QuoteEntity> {
    this.logger.log(`Start getting details for quote with Id - ${quoteID}`);
    const quote = await getRepository(QuoteEntity)
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.patient', 'patient')
      .leftJoinAndSelect('quote.surgeon', 'surgeon')
      .leftJoinAndSelect('quote.surgery', 'surgery')
      .where('quote.id = :id')
      .setParameter('id', quoteID)
      .getOne();
    this.logger.log(
      `Successfully returned details for quote with Id - ${quoteID}`,
    );
    return quote;
  }

  //Add New Quote
  async addQuote(data: {
    patient: any;
    surgeon: any;
    surgery: any;
    package1: number;
    package2: number;
    package3: number;
    actualPrice: number;
    isAdmitted: boolean;
  }): Promise<QuoteEntity> {
    const quote = this.repo.create(data);
    await this.repo.save(quote);
    this.logger.log(`Successfully Added Quote - ${quote.id}`);

    return quote;
  }

  //Edit Existing Quote Data
  //@params - Quote id and to edit description
  async editQuote(data: {
    patient?: any;
    surgeon?: any;
    surgery?: any;
    package1?: number;
    package2?: number;
    package3?: number;
    actualPrice?: number;
    isAdmitted?: boolean;
    id: number;
  }): Promise<QuoteEntity> {
    const quote = await this.repo.findOne({ where: { id: data.id } });
    const {
      patient,
      surgeon,
      surgery,
      package1,
      package2,
      package3,
      actualPrice,
      isAdmitted,
    } = data;

    if (patient) quote.patient = patient;
    if (surgeon) quote.surgeon = surgeon;
    if (surgery) quote.surgery = surgery;
    if (package1) quote.package1 = package1;
    if (package2) quote.package2 = package2;
    if (package3) quote.package3 = package3;
    if (actualPrice) quote.actualPrice = actualPrice;
    if (isAdmitted) quote.isAdmitted = isAdmitted;

    await this.repo.save(quote);
    this.logger.log(`Successfully Updated details of quote - ${quote.id}`);
    return patient;
  }

  //Delete quote
  //@params - quote id
  async deleteQuote(data: { id: number }) {
    await getRepository(QuoteEntity)
      .createQueryBuilder()
      .delete()
      .where('id = :id')
      .setParameter('id', data.id)
      .execute();

    this.logger.log(`Successfully deleted quote with Id - ${data.id}`);
  }

  //Get Quote for surgeon and surgery
  //@params - surgeon , surgery
  async getQuoteForSurgeonSurgery(
    surgeon: any,
    surgery: any,
  ): Promise<QuoteEntity[]> {
    this.logger.log(
      `Start getting details of Quotes for surgeon-${surgeon} and surgery-${surgery}`,
    );
    const res = await getRepository(QuoteEntity)
      .createQueryBuilder('tbl')
      .leftJoinAndSelect('quote.patient', 'patient')
      .leftJoinAndSelect('quote.surgeon', 'surgeon')
      .leftJoinAndSelect('quote.surgery', 'surgery')
      .where('tbl.surgeon.id = :surgeon')
      .andWhere('tbl.surgery.id = :surgery')
      .setParameters({ surgeon: 'surgeon', surgery: 'surgery' })
      .getMany();

    this.logger.log(
      `Successfully returned details of Quotes for surgeon-${surgeon} and surgery-${surgery}`,
    );
    return res;
  }
}
