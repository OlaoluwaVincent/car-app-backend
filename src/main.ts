import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config, corsOptions, options } from 'lib/utils';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.use(cookieParser());

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(9000);
}
bootstrap();
