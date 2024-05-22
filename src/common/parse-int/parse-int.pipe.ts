import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string | undefined, metadata: ArgumentMetadata): number {
    if (value === undefined || value === '') {
      return undefined;
    }

    const val = parseInt(value, 10);
    const regex = /^[0-9]+$/;

    if (isNaN(val) || !regex.test(value)) {
      throw new BadRequestException(`'${value}' is not a valid number.`);
    }

    return val;
  }
}
