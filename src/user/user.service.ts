import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { uploadProfileImage } from './utils';
import { OnBoardingDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateBillingAddress(
    req: Request,
    res: Response,
    onBoarding: OnBoardingDto,
  ) {
    const { userId } = req.user;

    const exitingAddress = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { billingId: true },
    });

    if (exitingAddress.billingId) {
      await this.prisma.bilingAddress.update({
        where: { id: exitingAddress.billingId },
        data: { ...onBoarding },
      });
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Billing address updated successfullly' });
    }
    console.log(onBoarding);

    //* CREATE AND CONNECT THE ADDRESS TO THE CURRENT LOGGED-IN USER
    const { contact, country, name, postalCode, region, state } = onBoarding;
    const billingAddress = await this.prisma.bilingAddress.create({
      data: {
        state: state,
        contact: contact,
        country: country,
        name: name,
        postalCode: postalCode,
        region: region,
        user: {
          connect: { id: userId },
        },
      },
    });

    if (!billingAddress) {
      throw new BadRequestException('Failed to create user billing address');
    }
    await this.prisma.userNotification.create({
      data: {
        notificationText: `Billing Address`,
        notificationClip:
          'Hi there!, You have successsfully added your Billing Address. <br/> Enjoy a seamless service',
        User: { connect: { id: userId } },
      },
    });

    return res.status(HttpStatus.CREATED).json({ result: billingAddress.id });
  }

  async findBillingAddress(id: string, res: Response) {
    const billingAddress = await this.prisma.bilingAddress.findUnique({
      where: { id: id },
    });

    if (!billingAddress) {
      throw new NotFoundException('Invalid billing address ID' + id);
    }
    return res.status(HttpStatus.CREATED).json({ result: billingAddress });
  }

  async findAll(res: Response) {
    const [userIds, userCount] = await Promise.all([
      this.prisma.user.findMany({
        select: {
          id: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return res.status(HttpStatus.OK).json({ result: { userIds, userCount } });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('Invalid Id');
    }
    const { hashedPassword, ...result } = user;
    return { user: result };
  }

  async update(
    req: Request,
    res: Response,
    id: string,
    updateUserDto: UpdateUserDto,
    image: Express.Multer.File,
  ) {
    const { userId: loggedInID } = req.user;
    // ? ONLY USERS CAN UPDATE THEIR OWN ACCOUNT

    if (id !== loggedInID) {
      throw new ForbiddenException('This is not your resource');
    }

    // * Retrieve user from db if it exist else throw an EXCEPTION
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // * VERIFY PASSWORD WITH PASSWORD IN DB
    if (updateUserDto.old_password) {
      const isPasswordValid = await this.verifyPassword(
        updateUserDto.old_password,
        user.hashedPassword,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Passwords do not match');
      }
      const newPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = newPassword;
    }

    // * UPLOAD PROFILE IMAGE OF THE USER => URL (string) or UNDEFINED||NULL||ERROR
    const imageUrl = await uploadProfileImage(image, 'profile');

    //  ! NOT ALL FIELDS ARE REQUIRED TO BE UPDATED, ONLY UPDATE AVAILABLE DTO FIELDS
    // * Return old user data if it isnt update.
    const updatedUserData = await this.prisma.user.update({
      where: { id: id },
      data: {
        name: updateUserDto.name ?? user.name,
        hashedPassword: updateUserDto.password ?? user.hashedPassword,
        profileImg: imageUrl ?? user.profileImg,
      },
    });

    if (!updatedUserData) {
      throw new BadRequestException(
        'Failed to Update Account, Please try again later',
      );
    }

    return res
      .status(HttpStatus.OK)
      .json({ result: { message: 'User updated successfully' } });
  }

  async remove(req: Request, res: Response, id: string) {
    const { userId } = this.getUserFromRequest(req);
    if (userId !== id) {
      throw new UnauthorizedException();
    }

    const userToDelete = await this.prisma.user.delete({ where: { id: id } });

    return res
      .status(HttpStatus.OK)
      .json({ result: { message: 'User deleted successfully' } });
  }

  async notifications(res: Response, userId: string) {
    // *GET ALL UNREAD NOTIFICATION
    const all_notifications = await this.prisma.userNotification.findMany({
      where: { ownerId: userId, AND: { readStatus: false } },
    });

    if (!all_notifications) {
      throw new BadRequestException('Failed to get Notifications for the user');
    }

    const notifications = all_notifications.map((n) => {
      const { id, notificationClip } = n;
      return { id, notificationClip };
    });
    return res.status(HttpStatus.OK).json({ result: notifications });
  }

  async notification(userId: string, notificationId: string) {
    const one_notification = await this.prisma.userNotification.findUnique({
      where: { id: notificationId, AND: { ownerId: userId } },
    });

    if (!one_notification) {
      throw new BadRequestException('Failed to get Notification');
    }
    // * MODIFY THE NOTIFICATION STATUS TO `READ`
    await this.prisma.userNotification.update({
      where: { id: one_notification.id },

      data: { readStatus: true },
    });

    const { ownerId, ...result } = one_notification;
    return { status: HttpStatus.OK, notification: result };
  }

  // * HELPER FUNCTIONS
  async verifyPassword(password: string, dbPassword: string) {
    const isMatch = await bcrypt.compare(password, dbPassword);
    return isMatch;
  }

  getUserFromRequest(data: Request) {
    const { role, email, userId } = data.user as {
      email: string;
      userId: string;
      role: string;
    };
    return { role, email, userId };
  }
}
