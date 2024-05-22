import { Module } from '@nestjs/common';
import { StoresController } from './controller/stores.controller';
import { StoresService } from './services/stores.service';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
