import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';
import {
  createStoretDTO,
  createDetails_StoreProductDTO,
  updateStoreDTO,
} from './../dto/stores.dto';

@Injectable()
export class StoresService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findAllStores() {
    return this.prisma.store.findMany();
  }

  async findAllDetails() {
    const details = await this.prisma.details_StoreProducts.findMany();

    return details.map((detail) => ({
      ...detail,
      time_registration: format(
        new Date(detail.time_registration),
        'dd/MM/yyyy - hh:mm:ss a',
      ),
    }));
  }

  findOneStore(id: number) {
    return this.prisma.store.findUnique({ where: { id } });
  }

  async findOneDetail(id: number) {
    const detail = await this.prisma.details_StoreProducts.findUnique({
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

  createStore(data: createStoretDTO) {
    return this.prisma.store.create({ data });
  }

  CreateDetail(data: createDetails_StoreProductDTO) {
    return this.prisma.details_StoreProducts.create({ data });
  }

  updateStore(id: number, data: updateStoreDTO) {
    return this.prisma.store.update({ where: { id }, data });
  }

  deleteStore(id: number) {
    return this.prisma.store.delete({ where: { id } });
  }

  deleteDetail(id: number) {
    return this.prisma.details_StoreProducts.delete({ where: { id } });
  }
}
