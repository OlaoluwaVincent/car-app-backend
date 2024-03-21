import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class ExtrasDto {
  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  paymentTime?: string;
}

export class CreateHireDto {
  @IsString()
  carId: string;

  @IsString()
  pickupLocation: string;

  @IsString()
  dropoffLocation: string;

  @ValidateNested()
  @IsOptional()
  extras?: ExtrasDto[];

  @IsString()
  amountToPayNow: string;

  @IsString()
  @IsOptional()
  amountToPayLater: string;
}
