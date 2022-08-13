import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PatientEntity } from 'src/entities/patient.entity';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private service: PatientService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<PatientEntity[]> {
    return await this.service.getAllPatients();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<PatientEntity> {
    return await this.service.getOnePatient(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      patientName: string;
      patientNo: number;
      pid: string;
    },
  ): Promise<PatientEntity> {
    return await this.service.addPatient(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      patientName?: string;
      patientNo?: number;
      pid?: string;
      id: number;
    },
  ): Promise<PatientEntity> {
    return await this.service.editPatients(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deletepatients(data);
  }
}
