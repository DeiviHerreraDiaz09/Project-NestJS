import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createUserDTO, updateUserDTO } from '../dto/users.dto';

@Injectable()
export class UsersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findAllUsers() {
    return this.prisma.user.findMany();
  }

  findOneUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data: createUserDTO) {
    return this.prisma.user.create({ data });
  }

  updateUser(id: number, data: updateUserDTO) {
    return this.prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
