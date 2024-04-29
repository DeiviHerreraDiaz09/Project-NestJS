import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
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
