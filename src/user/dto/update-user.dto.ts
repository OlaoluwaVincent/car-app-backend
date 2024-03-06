import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  old_password?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  region: string;

  @IsOptional()
  @IsString()
  address: string;
}
