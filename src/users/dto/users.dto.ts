import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createUserDTO {
  @IsString({ message: 'El nombre de usuario debe ser un String' })
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

// Forma rudimentaria de DTO para actualizar

// export class updateUserDTO {
//   @IsString()
//   @IsOptional()
//   readonly name?: string;

//   @IsEmail()
//   @IsOptional()
//   readonly email?: string;

//   @IsString()
//   @IsOptional()
//   readonly identification_number?: string;

//   @IsString()
//   @IsOptional()
//   readonly rol?: string;
// }

// Forma sintetizada de DTO para actualizar

export class updateUserDTO extends PartialType(createUserDTO) {}
