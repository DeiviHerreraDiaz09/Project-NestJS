import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
    @Get('')
    getUsers(): String {
      return 'Controlador categorias';
    }
}
