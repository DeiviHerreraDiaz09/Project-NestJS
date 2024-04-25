import { Controller, Get } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Stores")
@Controller('stores')
export class StoresController {
    @Get('')
    getUsers(): String {
      return 'Controlador tiendas';
    }
}
