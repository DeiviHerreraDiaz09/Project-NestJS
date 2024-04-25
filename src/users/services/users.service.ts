import { Injectable } from '@nestjs/common';
import { Users } from '../entities/users';
import { createUserDTO, updateUserDTO } from "../dto/users.dto"

@Injectable()
export class UsersService {
  private counterId = 1;

  private UsersData: Users[] = [
    {
      id: 1,
      name: 'Deivi',
      email: 'd@g.com',
      identification_number: '123456789',
      rol: 'Administrador',
    },
  ];

  findAllUsers() {
    return this.UsersData;
  }

  findOneUser(id: number) {
    return this.UsersData.find((usuario) => usuario.id == id);
  }

  create(data: createUserDTO) {
    this.counterId += 1;

    const newUser = {
      id: this.counterId,
      ...data,
    };

    this.UsersData.push(newUser);

    return newUser;
  }

  updateUser(id: number, data: updateUserDTO) {
    const elementIndex = this.UsersData.findIndex((user) => user.id == id);

    if (elementIndex === -1) {
      return 'No se encontró el usuario';
    }

    this.UsersData[elementIndex] = {
      ...this.UsersData[elementIndex],
      ...data,
    };

    return this.UsersData[elementIndex];
  }

  deleteUser(id: number) {
    const elementIndex = this.UsersData.findIndex((user) => user.id == id);

    if (elementIndex === -1) {
      return 'No se encontró el usuario';
    }

    this.UsersData.splice(elementIndex, 1);

    return {
      msg: 'Usuario eliminado con exito',
    };
  }
}
