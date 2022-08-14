import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { IncrementEntity } from 'src/entities/increment.entity';
import { IncrementService } from './increment.service';

@Controller('increment')
export class IncrementController {
  constructor(private service: IncrementService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<IncrementEntity[]> {
    return await this.service.getAllIncrements();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<IncrementEntity> {
    return await this.service.getOneIncrement(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      percentageIncrease: number;
      year: number;
      surgery: any;
    },
  ): Promise<IncrementEntity> {
    return await this.service.addIncrement(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      percentageIncrease?: number;
      year?: number;
      surgery?: any;
      id: number;
    },
  ): Promise<IncrementEntity> {
    return await this.service.editIncrement(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteIncrement(data);
  }
}
