import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { OnBoardingDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { Role, Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './multer.config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Res() res: Response) {
    return this.userService.findAll(res);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('profileImage', { storage }))
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.userService.update(req, res, id, updateUserDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
    return this.userService.remove(req, res, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('notifications')
  notifications(@Req() req: Request, @Res() res: Response) {
    const { userId } = req.user;
    return this.userService.notifications(res, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('notifications/:notificationId')
  notification(
    @Req() req: Request,
    @Param('notificationId') notificationId: string,
  ) {
    const { userId } = req.user;
    return this.userService.notification(userId, notificationId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('billingaddress')
  createAddress(
    @Req() req: Request,
    @Res() res: Response,
    @Body() onBoarding: OnBoardingDto,
  ) {
    return this.userService.createOrUpdateBillingAddress(req, res, onBoarding);
  }

  @UseGuards(JwtAuthGuard)
  @Get('billingaddress/:id')
  getAddress(@Param('id') id: string, @Res() res: Response) {
    return this.userService.findBillingAddress(id, res);
  }
}
