import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('')
    getUsers(): String {
      return 'Controlador productos';
    }
}
