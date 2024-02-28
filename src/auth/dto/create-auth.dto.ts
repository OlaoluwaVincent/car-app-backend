import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  password?: string;
}
