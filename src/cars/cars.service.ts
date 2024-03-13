import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Request, Response } from 'express';
import {
  destroyExistingImage,
  getImgIdToDelete,
  uploadMultipleImages,
} from 'src/user/utils';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

    const extras: Prisma.JsonArray = createCarDto.extras
      ? createCarDto.extras.map((extra) => ({
          name: extra.name,
          price: extra.price,
          description: extra.description,
          time_of_payment: extra.time_of_payment,
        }))
      : null;

    console.log(extras);
    // Populate the car
    const car = await this.prisma.car.create({
      data: {
        ...createCarDto,
        extras,
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
    return res
      .status(HttpStatus.CREATED)
      .json({ result: car.id, message: 'Successful' });
  }

  async findAll(res: Response) {
    const cars = await this.prisma.car.findMany({ select: { id: true } });

    return res
      .status(HttpStatus.CREATED)
      .json({ result: cars, message: 'Successful' });
  }

  async findOne(res: Response, id: string) {
    const car = await this.prisma.car.findUniqueOrThrow({
      where: { id: id },
      include: { carImage: { select: { id: true } } },
    });
    return res
      .status(HttpStatus.CREATED)
      .json({ result: car, message: 'Successful' });
  }

  async update(
    res: Response,
    id: string,
    updateCarDto: UpdateCarDto,
    images: Express.Multer.File[],
  ) {
    // * FIND DATA TO UPDATE
    const car_to_update = await this.prisma.car.findUnique({
      where: { id: id },
      include: {
        carImage: true,
      },
    });

    // * THROW EXCEPTION IF NOT FOUND
    if (!car_to_update) {
      throw new NotFoundException(`The car with this id: ${id} was not found`);
    }

    // * EXTRACT DTOP INTO NEW OBJECT FOR EASY MANIPULATION
    const update_data = { ...updateCarDto };
    let image_url: {
      url: string;
      public_id: string;
    }[] = [];

    //* Extract IDs of images to be deleted
    let deletedIds = [];
    if (update_data.deleteCarIds !== undefined || null || '') {
      deletedIds = Array.isArray(update_data.deleteCarIds)
        ? update_data.deleteCarIds
        : [update_data.deleteCarIds];
    }
    // * UPLOAD IMAGE TO CLOUDINARY DB AND SAVE RESPONSE TO A NEW ARRAY
    if (images && images.length) {
      const response = await uploadMultipleImages(images);
      image_url.push(...response);
    }

    //* REMOVE THEM FROM CLOUDINARY
    if (deletedIds !== undefined && deletedIds.length > 0) {
      await destroyExistingImage(deletedIds);
    }

    //* Filter out deleted images from the existing images
    const existingImages = (
      car_to_update.carImage.images as Prisma.JsonArray
    ).filter((image: { url: string; public_id: string }) => {
      return !deletedIds.includes(image.public_id);
    });

    //* Combine existing images with newly uploaded images
    const updatedImages = [...existingImages, ...image_url];

    let extras: Prisma.JsonArray;
    if (updateCarDto.extras) {
      extras = updateCarDto.extras.map((extra) => ({
        name: extra.name,
        price: extra.price,
        description: extra.description,
        paymentTime: extra.paymentTime,
      }));
    }

    //! Do this to prevent prisma error field for deletedCarIds
    delete update_data.deleteCarIds;
    delete update_data.extras;

    // * UPDATING USER DB WITH THE NEW UPLOADED IMAGES AND THE OTHER FIELDS
    // // ? THE NEW UPLOADED DATA IS WHAT IS RETURNED TO THE USER WITH THE EXISTING ONES
    const update_car = await this.prisma.car.update({
      where: { id: car_to_update.id },
      data: {
        ...update_data,
        extras,
        carImage: {
          update: {
            images: updatedImages,
          },
        },
      },
    });
    if (!update_car) {
      throw new BadRequestException('Something went wrong with this update');
    }

    return res
      .status(HttpStatus.OK)
      .json({ result: update_car.id, message: 'Updated Successfully' });
  }

  async remove(res: Response, id: string) {
    const car_to_delete = await this.prisma.car.findUnique({
      where: { id: id },
      include: { carImage: true },
    });

    if (!car_to_delete) {
      throw new NotFoundException('Car was not found');
    }

    // * MAP OUT THE CLOUDINARY PUBLIC_ID FROM THE IMAGE DB
    const imgs_to_delete = getImgIdToDelete(car_to_delete.carImage.images);

    // * ARRAY OF IDS TO DELETE FROM CLOUDINARY
    // ? THIS DOES NOT DELETE THE IMAGES FROM THE DATABASE ITSELF BUT FROM CLOUDINARY DB
    const image_to_delete_from_cloudinary = imgs_to_delete.map(
      (img) => img.public_id,
    );

    await destroyExistingImage(image_to_delete_from_cloudinary);

    // * DELETE CAR AND ALL DATA ASSOCIATED FROM IT i.e IMAGES
    await this.prisma.car.delete({
      where: { id: car_to_delete.id },
    });

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Car has been deleted' });
  }

  async findImages(res: Response, id: string) {
    const images = await this.prisma.carImage.findUnique({
      where: { id: id },
      select: { images: true },
    });

    if (!images) {
      throw new NotFoundException(`Images with this ${id} was not found`);
    }

    return res
      .status(HttpStatus.OK)
      .json({ result: images, message: 'Successful' });
  }
}
