import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

import {
  createDetails_UserProductDTO,
  createUserDTO,
  updateUserDTO,
} from '../dto/users.dto';

@Injectable()
export class UsersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findAllDetails() {
    const details = await this.prisma.details_UserProducts.findMany();
    return details.map((detail) => ({
      ...detail,
      time_registration: format(
        new Date(detail.time_registration),
        'dd/MM/yyyy - hh:mm:ss a',
      ),
    }));
  }

  findOneUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneDetail(id: number) {
    const detail = await this.prisma.details_UserProducts.findUnique({
      where: { id },
    });

    if (!detail) {
      throw new NotFoundException('Detail not found');
    }

    return {
      ...detail,
      time_registration: format(
        new Date(detail.time_registration),
        'dd/MM/yyyy - hh:mm:ss a',
      ),
    };
  }

  createUser(data: createUserDTO) {
    return this.prisma.user.create({ data });
  }

  createDetail(data: createDetails_UserProductDTO) {
    return this.prisma.details_UserProducts.create({ data });
  }

  updateUser(id: number, data: updateUserDTO) {
    return this.prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  deleteDetail(id: number) {
    return this.prisma.details_UserProducts.delete({ where: { id } });
  }
}
