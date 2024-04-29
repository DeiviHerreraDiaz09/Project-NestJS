import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createProductDTO, updateProductDTO } from './../dto/products.dto';

@Injectable()
export class ProductsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findOneProduct(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  findAllProducts() {
    return this.prisma.product.findMany();
  }

  createProduct(data: createProductDTO) {
    return this.prisma.product.create({ data });
  }

  updateProduct(id: number, data: updateProductDTO) {
    return this.prisma.product.update({ where: { id }, data });
  }

  deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
  
}
