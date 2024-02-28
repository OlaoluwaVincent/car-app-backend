import { ConfigService } from '@nestjs/config';

// Instantiate a ConfigService instance
const configService = new ConfigService();

// Access the SECRET_KEY environment variable
export const jwt_constants = {
  secret: configService.get<string>('SECRET_KEY'),
};
