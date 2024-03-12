import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
  Res,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/user/multer.config';
import { Request, Response } from 'express';
import { Role, Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 4, { storage }))
  create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFiles() image: Express.Multer.File[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!image.length) {
      throw new BadRequestException('Please uploaded messages');
    }
    return this.carsService.create(createCarDto, image, req, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.carsService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.carsService.findOne(res, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 4, { storage }))
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @UploadedFiles() image: Express.Multer.File[],
  ) {
    return this.carsService.update(res, id, updateCarDto, image);
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.carsService.remove(res, id);
  }

  @Get('images/:id')
  fetchImage(@Res() res: Response, @Param('id') id: string) {
    return this.carsService.findImages(res, id);
  }
}
