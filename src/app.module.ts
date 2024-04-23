import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsController } from './controllers/products/products.controller';
import { UsersController } from './controllers/users/users.controller';
import { StoresController } from './controllers/stores/stores.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { UsersService } from './services/users/users.service';
import { ProductsService } from './services/products/products.service';
import { CategoriesService } from './services/categories/categories.service';
import { StoresService } from './services/stores/stores.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, UsersController, StoresController],
  providers: [UsersService, ProductsService, CategoriesService, StoresService],
})
export class AppModule {}
