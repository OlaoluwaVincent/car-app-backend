import { SetMetadata } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000', // Change this to your frontend URL in production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

export const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};

export const config = new DocumentBuilder()
  .setTitle('CAR SYSTEM')
  .setDescription('This is the endpoints for all activities')
  .setVersion('1.0')
  .addTag('Cars')
  .build();

// CUSTOM DECORATORS
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
