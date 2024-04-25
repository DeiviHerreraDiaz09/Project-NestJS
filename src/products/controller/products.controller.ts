import { Controller, Get } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Products")
@Controller('products')
export class ProductsController {
    @Get('')
    getUsers(): String {
      return 'Controlador productos';
    }
}
