import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [UsersModule, ProductsModule, CategoriesModule, StoresModule],
  controllers: [AppController],
  providers: [], 
})
export class AppModule {}
