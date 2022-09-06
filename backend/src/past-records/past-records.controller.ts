import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PastRecordsEntity } from 'src/entities/pastRecords.entity';
import { PastRecordService } from './past-records.service';

@Controller('past-records')
export class PastRecordsController {
  constructor(private service: PastRecordService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<PastRecordsEntity[]> {
    return await this.service.getAllPastRecords();
  }

  @Post('/getRecordsForSurgeonSurgery')
  // @UseGuards(JwtAuthGuard)
  async getRecordsForSurgeonSurgery(
    @Body() data: { surgeon: any; surgery: any },
  ): Promise<PastRecordsEntity[]> {
    return await this.service.getRecordForSurgeonSurgery(
      data.surgeon,
      data.surgery,
    );
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<PastRecordsEntity> {
    return await this.service.getOneRecord(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      surgeon: any;
      surgery: any;
      bedCategory: string;
      LOS: string;
      hospitalFee: number;
      consultationFee: number;
      dischargeDate: Date;
    },
  ): Promise<PastRecordsEntity> {
    return await this.service.addRecord(data);
  }

  @Post('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      surgeon?: any;
      surgery?: any;
      bedCategory?: string;
      LOS?: string;
      hospitalFee?: number;
      consultationFee?: number;
      dischargeDate?: Date;
      id: number;
    },
  ): Promise<PastRecordsEntity> {
    return await this.service.editRecord(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteRecord(data);
  }
}
