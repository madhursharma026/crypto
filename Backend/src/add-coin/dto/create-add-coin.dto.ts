import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddCoinDto {
  @IsString()
  @IsNotEmpty()
  coinId: string;
  
  @IsString()
  @IsNotEmpty()
  coinName: string;

  @IsNumber()
  @IsNotEmpty()
  coinPrice: number;

  @IsNumber()
  @IsNotEmpty()
  coinQty: number;
}
