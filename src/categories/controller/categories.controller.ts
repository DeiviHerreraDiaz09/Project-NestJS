import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CategoriesService } from './../services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('')
  GetCategories(@Query('id', ParseIntPipe) id: number): String {
    if (id !== undefined) {
      const categoryFind = this.categoriesService.findOneCategory(id);

      if (!categoryFind) {
        throw new NotFoundException('Category not found');
      }

      return categoryFind;
    }

    return this.categoriesService.findAllCategories();
  }
}
