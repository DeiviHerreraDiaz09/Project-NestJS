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
  Query,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { createUserDTO, updateUserDTO } from '../dto/users.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private UserServiceImplement: UsersService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getUsers(@Query('id', ParseIntPipe) id: number): any {
    if (id !== undefined) {
      const userFind = this.UserServiceImplement.findOneUser(id);

      if (!userFind) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return userFind;
    }
    return this.UserServiceImplement.findAllUsers();
  }

  @Post()
  createUser(@Body() data: createUserDTO): any {
    try {
      const createdUser = this.UserServiceImplement.create(data);

      if (!createdUser) {
        throw new NotFoundException('No fue posible la inserción del usuario');
      }

      return {
        status: 'Success',
        msg: `Usuario con id ${createdUser.id} creado con exito`,
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateUserDTO,
  ): any {
    try {
      const updatedUser = this.UserServiceImplement.updateUser(id, data);

      if (!updatedUser) {
        throw new NotFoundException(
          'No fue posible la actualización del usuario',
        );
      }

      return {
        status: 'Success',
        msg: `Usuario con ${id} actualizado con exito`,
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): any {
    const deletedUser = this.UserServiceImplement.deleteUser(id);

    if (!deletedUser) {
      throw new NotFoundException('No fue posible la eliminación del usuario');
    }

    return deletedUser;
  }
}
