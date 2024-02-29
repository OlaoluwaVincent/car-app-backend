import { IsString } from 'class-validator';

export class OnBoardingDto {
  @IsString()
  state: string;

  @IsString()
  region: string;
}
