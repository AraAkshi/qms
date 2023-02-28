import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PackageEntity } from 'src/entities/package.entity';
import { SurgeonEntity } from 'src/entities/surgeon.entity';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private service: PackageService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<PackageEntity[]> {
    return await this.service.getAllPackages();
  }

  @Post('/getSurgeonsForSurgery')
  // @UseGuards(JwtAuthGuard)
  async getSurgeonsForSurgery(
    @Body() data: { surgery: any },
  ): Promise<SurgeonEntity[]> {
    return await this.service.getSurgeonsForSurgery(data.surgery);
  }

  @Post('/getPackagesForSurgeonSurgery')
  // @UseGuards(JwtAuthGuard)
  async getPackagesForSurgeonSurgery(
    @Body() data: { surgeon: any; surgery: any },
  ): Promise<PackageEntity[]> {
    return await this.service.getpackageForSurgeonSurgery(
      data.surgeon,
      data.surgery,
    );
  }

  @Post('/getOne')
  // @UseGuards(JwtAuthGuard)
  async getOne(@Body() data: { id: number }): Promise<PackageEntity> {
    return await this.service.getOnepackage(data.id);
  }

  @Post('/add')
  // @UseGuards(JwtAuthGuard)
  async add(
    @Body()
    data: {
      surgeon: any;
      surgery: any;
      packageName: string;
      hospitalFee: number;
      consultantFee: number;
    },
  ): Promise<PackageEntity> {
    return await this.service.addpackage(data);
  }

  @Post('/edit')
  // @UseGuards(JwtAuthGuard)
  async edit(
    @Body()
    data: {
      surgeon?: any;
      surgery?: any;
      packageName?: string;
      hospitalFee?: number;
      consultantFee?: number;
      id: number;
    },
  ): Promise<PackageEntity> {
    return await this.service.editpackage(data);
  }

  @Delete('/delete')
  // @UseGuards(JwtAuthGuard)
  async delete(@Body() data: { id: number }) {
    await this.service.deletepackage(data);
  }
}
