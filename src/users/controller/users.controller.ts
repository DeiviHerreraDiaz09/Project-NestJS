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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private UserServiceImplement: UsersService) {}

  @Get('')
  // @HttpCode(HttpStatus.OK) IMPLEMENTAR HTTPCODE A TODOS LOS ENDPOINTS
  getUsers(@Query('id', ParseIntPipe) id: number) {
    if (id !== undefined) {
      const userFind = this.UserServiceImplement.findOneUser(id);

      if (!userFind) {
        throw new NotFoundException('User not found');
      }
      return userFind;
    }
    return this.UserServiceImplement.findAllUsers();
  }

  @Post()
  async createUser(@Body() data: createUserDTO) {
    try {
      const createdUser = await this.UserServiceImplement.createUser(data);

      if (!createdUser) {
        throw new NotFoundException('It was not possible to create the user');
      }
      return {
        status: 'Success',
        msg: `User successfully created`,
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateUserDTO,
  ) {
    try {
      const updatedUser = await this.UserServiceImplement.updateUser(id, data);

      if (!updatedUser) {
        throw new NotFoundException('It was not possible to update the user');
      }
      return {
        status: 'Success',
        msg: `user ${id} successfully updated`,
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): any {
    const deletedUser = this.UserServiceImplement.deleteUser(id);
    if (!deletedUser) {
      throw new NotFoundException('It was not possible to delete the user');
    }
    return deletedUser;
  }
}
