import { Controller, Get } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
    @Get('')
    getUsers(): String {
      return 'Controlador categorias';
    }
}
