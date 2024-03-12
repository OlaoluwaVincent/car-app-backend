import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CarsModule } from './cars/cars.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { HireModule } from './hire/hire.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    CarsModule,
    AnalyticsModule,
    AuthModule,
    PrismaModule,
    HireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
