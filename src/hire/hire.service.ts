import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHireDto } from './dto/create-hire.dto';
import { UpdateHireDto } from './dto/update-hire.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Injectable()
export class HireService {
  constructor(private readonly prisma: PrismaService) {}
  async create(req: Request, res: Response, createHireDto: CreateHireDto) {
    const {
      amountToPayLater,
      amountToPayNow,
      carId,
      dropoffLocation,
      pickupLocation,
      extras,
    } = createHireDto;

    let extrasData: Prisma.JsonArray;
    if (extras) {
      extrasData = extras.map((extra) => ({
        name: extra.name,
        price: extra.price,
        description: extra.description,
        paymentTime: extra.paymentTime,
      }));
    }
    const hireCar = await this.prisma.hiredCar.create({
      data: {
        dropoffAddress: dropoffLocation,
        payLaterPrice: amountToPayLater,
        payNowPrice: amountToPayNow,
        pickupAddress: pickupLocation,
        extras: extrasData,
        carHiredId: { connect: { id: carId } },
        User: { connect: { id: req.user.userId } },
      },
    });

    if (!hireCar) {
      throw new BadRequestException('Failed to Hire Car.');
    }
    await this.prisma.car.update({
      where: { id: carId },
      data: { rented: true },
    });

    // TODO:Payment Api integration
    // TODO: Email Service
    return res.status(HttpStatus.CREATED).json({ result: hireCar.id });
  }

  async findAll(res: Response) {
    const hiredCars = await this.prisma.hiredCar.findMany();
    const hiredCarsId = hiredCars.map((hiredCar) => hiredCar.id);

    return res.status(HttpStatus.CREATED).json({ result: hiredCarsId });
  }

  async findOne(res: Response, id: string) {
    const hiredCar = await this.prisma.hiredCar.findUnique({
      where: { id: id },
    });
    if (!hiredCar) {
      throw new NotFoundException(`Car with the id: ${id} was not found`);
    }
    return res.status(HttpStatus.CREATED).json({ result: hiredCar });
  }

  update(id: number, updateHireDto: UpdateHireDto) {
    return `This action updates a #${id} hire`;
  }

  remove(id: number) {
    return `This action removes a #${id} hire`;
  }
}
