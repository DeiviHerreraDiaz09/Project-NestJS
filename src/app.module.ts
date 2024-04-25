import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from './users/controller/users.controller';
import { StoresController } from './stores/controller/stores.controller';
import { ProductsController } from './products/controller/products.controller';
import { CategoriesController } from './categories/controller/categories.controller';
import { UsersService } from './users/services/users.service';
import { ProductsService } from './products/services/products.service';
import { CategoriesService } from './categories/services/categories.service';
import { StoresService } from './stores/services/stores.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [UsersModule, ProductsModule, CategoriesModule, StoresModule],
  controllers: [AppController, ProductsController, CategoriesController, UsersController, StoresController],
  providers: [UsersService, ProductsService, CategoriesService, StoresService], 
})
export class AppModule {}
