import { ConfigService } from '@nestjs/config';

// Instantiate a ConfigService instance
const configService = new ConfigService();

// Access the SECRET_KEY environment variable
export const jwt_constants = {
  secret: configService.get<string>('SECRET_KEY'),
  cloud_name: configService.get<string>('CLOUD_NAME'),
  api_key: configService.get<string>('API_KEY'),
  api_secret: configService.get<string>('API_SECRET'),
};

export const cloudinary_constants = {
  cloud_name: jwt_constants.cloud_name,
  api_key: jwt_constants.api_key,
  api_secret: jwt_constants.api_secret,
};
