import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // async validate(data: { username: string; password: string }): Promise<any> {
  //   console.log('user', data);
  //   const user = await this.authService.validateUser({
  //     username: data.username,
  //     password: data.password,
  //   });
  //   if (!user) {
  //     console.log('invalid', user);
  //     throw new UnauthorizedException('No Logged in user');
  //   }
  //   return user;
  // }
}
