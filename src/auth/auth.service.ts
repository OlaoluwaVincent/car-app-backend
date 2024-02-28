import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // CREATE USERS
  async createUsers(body: CreateAuthDto) {
    const userExists = !!(await this.prisma.user.findUnique({
      where: { email: body.email },
    }));

    if (userExists) {
      throw new BadRequestException('User already exists, please login');
    }

    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);

    //  IF NOT SIGNED WITH CREDENTIALS, GENERATE A PASSWORD WITH USERS EMAIL
    const hash = await bcrypt.hash(body.password ?? body.email, salt);
    console.log(hash);

    const newUser = await this.prisma.user.create({
      data: {
        email: body.email,
        hashedPassword: hash,
        name: body.name,
      },
    });
    if (!newUser) {
      throw new BadRequestException('Error creating account, try again!!');
    }

    const { hashedPassword, ...result } = newUser;

    return { result };
    //
  }

  // LOGIN USERS
  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(data.password, user.hashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = await this.signToken({
      userId: data.password,
      email: data.email,
    });

    const { hashedPassword, ...result } = user;
    return { token, result };
  }

  // ASSIGN A TOKEN TO USER
  async signToken(args: { userId: string; email: string }) {
    const payload = args;
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWTSECRET,
      expiresIn: '24h',
    });
  }

  // THIS IS FOR PASSPORT LOCAL STRATEGY
  // async validateUser(data: {
  //   username: string;
  //   password: string;
  // }): Promise<any> {
  //   console.log('validating');
  //   console.log(data);
  //   const user = await this.userService.findOne(data.username);
  //   if (user && user.password === data.password) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
}
