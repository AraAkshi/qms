import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PackageEntity } from 'src/entities/package.entity';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private service: PackageService) {}

  @Get('/getAll')
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<PackageEntity[]> {
    return await this.service.getAllPackages();
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
      package1: number;
      package2: number;
      package3: number;
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
      package1?: number;
      package2?: number;
      package3?: number;
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
