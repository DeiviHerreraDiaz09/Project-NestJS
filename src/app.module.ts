import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsController } from './controllers/products/products.controller';
import { UsersController } from './controllers/users/users.controller';
import { StoresController } from './controllers/stores/stores.controller';
import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController, UsersController, StoresController],
  providers: [],
})
export class AppModule {}
