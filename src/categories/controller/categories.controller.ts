import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CategoriesService } from './../services/categories.service';
import { createCategoryDTO, updateCategoryDTO } from './../dto/categories.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('')
  GetCategories(@Query('id', ParseIntPipe) id: number) {
    try {
      if (id !== undefined) {
        const categoryFind = this.categoriesService.findOneCategory(id);

        if (!categoryFind) {
          throw new NotFoundException('Category not found');
        }
        return categoryFind;
      }
      return this.categoriesService.findAllCategories();
    } catch (error) {
      return error;
    }
  }

  @Post('')
  async CreateCategory(@Body() data: createCategoryDTO) {
    try {
      const createdCategory = await this.categoriesService.createCategory(data);

      if (!createdCategory) {
        throw new NotFoundException('It was not possible to create the user');
      }

      return {
        status: 'Success',
        msg: `Successfully created category`,
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  async UpdateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateCategoryDTO,
  ) {
    try {
      const updateCategory = await this.categoriesService.updateCategory(
        id,
        data,
      );
      if (!updateCategory) {
        throw new NotFoundException(
          'It was not possible to update the category',
        );
      }
      return {
        status: 'Success',
        msg: `Category ${id} successfully updated`,
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedCategory = this.categoriesService.deleteCategory(id);
      if (!deletedCategory) {
        throw new NotFoundException(
          'It was not possible to delete the category',
        );
      }
      return deletedCategory;
    } catch (error) {
      return error;
    }
  }
}
