import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createCategoryDTO {
  @IsString({ message: 'The category name must be a String ' })
  @IsNotEmpty()
  readonly name: string;
}

export class updateCategoryDTO extends PartialType(createCategoryDTO) {}
