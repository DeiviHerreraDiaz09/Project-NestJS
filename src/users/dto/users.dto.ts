import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createUserDTO {
  @IsString({ message: 'The user name must be a String' })
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly identificationNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly rol: string;
}

export class updateUserDTO extends PartialType(createUserDTO) {}

// Details user/product

export class createDetails_UserProductDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly user_fk: number;

  @IsNotEmpty()
  @IsNumber()
  readonly product_fk: number;
}
