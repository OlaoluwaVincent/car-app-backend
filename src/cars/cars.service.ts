import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Request, Response } from 'express';
import { uploadMultipleImages } from 'src/user/utils';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}
  async create(
    createCarDto: CreateCarDto,
    images: Express.Multer.File[],
    req: Request,
    res: Response,
  ) {
    const { userId } = req.user;

    const imageUrl = await uploadMultipleImages(images);
    if (!imageUrl && !images) {
      throw new BadRequestException('Failed to Upload Images');
    }

    // Populate the car
    const car = await this.prisma.car.create({
      data: {
        ...createCarDto,
        carImage: {
          create: {
            images: imageUrl,
          },
        },
        User: { connect: { id: userId } },
      },
    });

    if (!car) {
      throw new BadRequestException('Something went wrong creating Data');
    }

    // * RETURN THE ID OF THE CAR CREATED
    // return res.status(HttpStatus.CREATED).json({ result: car });
    return res.status(HttpStatus.CREATED).json({ result: car.id });
  }

  async findAll(res: Response) {
    const cars = await this.prisma.car.findMany({ select: { id: true } });

    return res.status(HttpStatus.CREATED).json({ result: cars });
  }

  async findOne(res: Response, id: string) {
    const car = await this.prisma.car.findUniqueOrThrow({ where: { id: id } });
    return res.status(HttpStatus.CREATED).json({ result: car });
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  async remove(res: Response, id: string) {
    const car_to_delete = await this.prisma.car.findUnique({
      where: { id: id },
    });

    if (!car_to_delete) {
      throw new NotFoundException('Car was not found');
    }

    const car = await this.prisma.car.delete({
      where: { id: car_to_delete.id },
    });

    return res
      .status(HttpStatus.CREATED)
      .json({ result: { message: 'Car has been deleted' } });
  }
}
