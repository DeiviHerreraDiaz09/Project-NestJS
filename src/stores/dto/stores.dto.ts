import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createStoretDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly user_fk: number;
}

export class updateStoreDTO extends PartialType(createStoretDTO) {}

// Details store/product

export class createDetails_StoreProductDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly store_fk: number;

  @IsNotEmpty()
  @IsNumber()
  readonly product_fk: number;
}
