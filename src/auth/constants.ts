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
