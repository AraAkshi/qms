import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SurgeryEntity } from 'src/entities/sugery.entity';
import { SurgeryService } from './surgery.service';

@Controller('surgery')
export class SurgeryController {
  constructor(private service: SurgeryService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<SurgeryEntity[]> {
    return await this.service.getAllSurgerys();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<SurgeryEntity> {
    return await this.service.getOnesurgery(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      surgeryName: string;
    },
  ): Promise<SurgeryEntity> {
    return await this.service.addsurgery(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      surgeryName?: string;
      id: number;
    },
  ): Promise<SurgeryEntity> {
    return await this.service.editsurgerys(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deletesurgerys(data);
  }
}
