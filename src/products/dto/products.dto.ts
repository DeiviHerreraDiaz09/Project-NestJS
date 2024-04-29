import { IsString, IsNotEmpty, IsNumber, IsPositive} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createProductDTO {
  
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly category_fk: number;
}

export class updateProductDTO extends PartialType(createProductDTO) {}
