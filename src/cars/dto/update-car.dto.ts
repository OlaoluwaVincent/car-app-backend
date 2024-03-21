import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExtrasDto {
  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  paymentTime?: 'Now' | 'Pickup';
}

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

  @ApiProperty({
    example: 'Free Cancellation',
    description:
      'Are users allowed to cancel their order for free after booking?',
  })
  @IsBoolean()
  @IsOptional()
  cancellation?: boolean;

  @ApiProperty({
    example: '2000km/day',
    description:
      'How many kilometers are the users allowed, if set, then you must set price per KM, if not set, Unlimited mileage will be displayed to the Rentee',
  })
  @IsString()
  @IsOptional()
  mileage?: string;

  @ApiProperty({
    example: '3',
    description: 'Bags',
  })
  @IsString()
  @IsOptional()
  bags?: string;

  @ApiProperty({
    example: '25',
    description: 'Amount to be paid per kilometer if Mileage is exceeded',
  })
  @IsString()
  @IsOptional()
  pricePerKM?: string;

  @ApiProperty({
    example: '3',
    description: 'Discount in percentage',
  })
  @IsString()
  @IsOptional()
  discount?: string;

  @ApiProperty({
    example: 'Extras',
    description: 'Extra services requested',
  })
  @IsOptional()
  @ValidateNested()
  extras?: ExtrasDto[];
}
