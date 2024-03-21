import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ExtrasDto {
  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  time_of_payment?: 'Now' | 'Pickup';
}

export class CreateCarDto {
  @ApiProperty({
    example: 'Car Model XYZ',
    description: 'Name of the car',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Sedan',
    description: 'Type of the car',
  })
  @IsString()
  carType: string;

  @ApiProperty({
    example: 'Manual',
    description: 'Type of steering (e.g., Manual, Automatic)',
  })
  @IsString()
  steering: string;

  @ApiProperty({
    example: '4',
    description: 'Capacity of the car',
  })
  @IsString()
  capacity: string;

  @ApiProperty({
    example: 'Gasoline',
    description: 'Type of fuel used by the car',
  })
  @IsString()
  gasoline: string;

  @ApiProperty({
    example: '500',
    description: 'Rental amount for the car',
  })
  @IsString()
  amount: string;

  @ApiProperty({
    example: 'Car description goes here',
    description: 'Description of the car',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Family',
    description: 'Optional tag for the car',
  })
  @IsString()
  @IsOptional()
  tag: string;

  @ApiProperty({
    example: 'Family car with spacious interiors',
    description: 'Description of the optional tag',
  })
  @IsString()
  @IsOptional()
  tagDescription: string;

  @ApiProperty({
    example: 'Abuja',
    description: 'State or province the car is located at the time',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: 'City Name',
    description: 'Region where the car is located at the time',
  })
  @IsString()
  region: string;

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
