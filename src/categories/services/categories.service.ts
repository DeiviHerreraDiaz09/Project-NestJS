import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createCategoryDTO, updateCategoryDTO } from './../dto/categories.dto';

@Injectable()
export class CategoriesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findOneCategory(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  findAllCategories() {
    return this.prisma.category.findMany();
  }

  createCategory(data: createCategoryDTO) {
    return this.prisma.category.create({ data });
  }

  updateCategory(id: number, data: updateCategoryDTO) {
    return this.prisma.category.update({ where: { id }, data });
  }

  deleteCategory(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
