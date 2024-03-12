import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  amount?: string;

  @IsString()
  @IsOptional()
  capacity?: string;

  @IsString()
  @IsOptional()
  carType?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  gasoline?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  steering?: string;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsString()
  @IsOptional()
  tagDescription?: string;

  @IsOptional()
  @IsString()
  deleteCarIds?: string[];
}
