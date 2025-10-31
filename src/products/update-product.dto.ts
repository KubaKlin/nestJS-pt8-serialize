import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CanBeUndefined } from './can-be-undefined';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @CanBeUndefined()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsOptional()
  @CanBeUndefined()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @CanBeUndefined()
  isInStock: boolean;
}
