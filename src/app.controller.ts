import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Recibir parametros con PARAM

  @Get("/prueba/:id")
  rutaPrueba(@Param("id") id: String): string {
    return `Esto es una prueba, con id ${id}`
  }

  @Get("/pruebatwo/:msg")
  rutaPruebaTwo(@Param("") params: any): string {
    return `Este es el mensaje: ${params.msg}`
  }

  // Recibir parametros con Query

  @Get("pruebathree")
  rutaPruebaThree(@Query() params: any): String {
    const { limit, offset } = params
    return `Productos: limite => ${limit}, offset => ${offset}`
  }

  @Get("pruebafour")
  rutaPruebaFour(@Query("msg") msg: String) {
    if (msg) {
      return `Este es el mensaje: ${msg}`
    }
    return 'No hay ningún mensaje'
  }
  
}
