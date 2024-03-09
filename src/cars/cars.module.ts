import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  controllers: [CarsController],
  providers: [CarsService, JwtAuthGuard, RolesGuard],
})
export class CarsModule {}
