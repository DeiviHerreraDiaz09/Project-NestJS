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
import { createProductDTO, updateProductDTO } from './../dto/products.dto';
import { ProductsService } from './../services/products.service';
import { CategoriesService } from './../../categories/services/categories.service';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  @Get('')
  getUsers(@Query('id', ParseIntPipe) id: number) {
    try {
      if (id !== undefined) {
        const productFind = this.productsService;
        if (!productFind) {
          throw new NotFoundException('Product not found');
        }
        return productFind;
      }
      return this.productsService.findAllProducts();
    } catch (error) {
      return error;
    }
  }

  @Post('')
  async createProduct(@Body() data: createProductDTO) {
    try {
      const { category_fk } = data;
      const categoryExists =
        await this.categoriesService.findOneCategory(category_fk);
      if (!categoryExists) {
        return {
          status: 'Error',
          msg: 'The category does not exist, the product cannot be created..',
        };
      }
      const createdProduct = await this.productsService.createProduct(data);
      if (!createdProduct) {
        throw new NotFoundException(
          'It was not possible to create the product',
        );
      }
      return {
        status: 'Success',
        msg: `Successfully created product`,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateProductDTO,
  ) {
    try {
      if (data.category_fk) {
        const categoryExists = await this.categoriesService.findOneCategory(
          data.category_fk,
        );
        if (!categoryExists) {
          throw new NotFoundException('The specified category does not exist.');
        }
      }
      const updatedProduct = await this.productsService.updateProduct(id, data);
      if (!updatedProduct) {
        throw new NotFoundException(
          'It was not possible to update the product.',
        );
      }
      return {
        status: 'Success',
        msg: `Product ${id} updated correctly`,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedProduct = this.productsService.deleteProduct(id);
      if (!deletedProduct) {
        throw new NotFoundException(
          'It was not possible to delete the product',
        );
      }
      return deletedProduct;
    } catch (error) {
      return error;
    }
  }
}
