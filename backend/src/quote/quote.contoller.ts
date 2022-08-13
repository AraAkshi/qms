import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { QuoteEntity } from 'src/entities/quote.entity';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private service: QuoteService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<QuoteEntity[]> {
    return await this.service.getAllQuotes();
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<QuoteEntity> {
    return await this.service.getOneQuote(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      patient: any;
      surgeon: any;
      surgery: any;
      package1: number;
      package2: number;
      package3: number;
      actualPrice: number;
      isAdmitted: boolean;
    },
  ): Promise<QuoteEntity> {
    return await this.service.addQuote(data);
  }

  @Put('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      patient?: any;
      surgeon?: any;
      surgery?: any;
      package1?: number;
      package2?: number;
      package3?: number;
      actualPrice?: number;
      isAdmitted?: boolean;
      id: number;
    },
  ): Promise<QuoteEntity> {
    return await this.service.editQuote(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deleteQuote(data);
  }
}
