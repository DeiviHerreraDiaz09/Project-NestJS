import { Controller, Get } from '@nestjs/common';

@Controller('stores')
export class StoresController {
    @Get('')
    getUsers(): String {
      return 'Controlador tiendas';
    }
}
