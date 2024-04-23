import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  dataUsers = [];

  @Get('')
  @HttpCode(HttpStatus.ACCEPTED)
  getUsers(): any {
    return this.dataUsers;
  }

  @Post()
  createUser(@Body() data: any): any {
    try {
      const { nombre, correo, identificacion } = data;

      if (this.createUser.length > 0) {
        const increment = this.dataUsers.length + 1;

        const schema = {
          id: increment,
          nombre,
          correo,
          identificacion,
        };

        const response = this.dataUsers.push(schema);
        if (!response) {
          return 'Error al agregar el elemento';
        }
        return this.dataUsers;
      }
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: any): any {
    try {
      const elementIndex = this.dataUsers.findIndex((user) => user.id == id);

      if (elementIndex === -1) {
        return 'No se encontro el usuario';
      }

      this.dataUsers[elementIndex] = {
        ...this.dataUsers[elementIndex],
        ...data,
      };

      return this.dataUsers[elementIndex];
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): string {
    const elementIndex = this.dataUsers.findIndex((user) => user.id === id);

    if (elementIndex === -1) {
      return 'No se encontró el usuario';
    }

    const deleted = this.dataUsers.splice(elementIndex, 1);

    if (deleted.length === 0) {
      return 'No se pudo eliminar el usuario';
    }

    return `Usuario eliminado con id: ${id}`;
  }
}
