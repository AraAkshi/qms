import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SurgeonEntity } from 'src/entities/surgeon.entity';
import { SurgeonService } from './surgeon.service';

@Controller('surgeon')
export class SurgeonController {
  constructor(private service: SurgeonService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<SurgeonEntity[]> {
    return await this.service.getAllSurgeons();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<SurgeonEntity> {
    return await this.service.getOnesurgeon(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      surgeonName: string;
    },
  ): Promise<SurgeonEntity> {
    return await this.service.addsurgeon(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      surgeonName?: string;
      id: number;
    },
  ): Promise<SurgeonEntity> {
    return await this.service.editsurgeons(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deletesurgeons(data);
  }
}
