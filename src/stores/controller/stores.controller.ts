import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  NotFoundException,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoresService } from './../services/stores.service';
import {
  createStoretDTO,
  updateStoreDTO,
  createDetails_StoreProductDTO,
} from './../dto/stores.dto';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { UsersService } from './../../users/services/users.service';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(
    private storesServiceImplement: StoresService,
    private usersServiceImplement: UsersService,
  ) {}

  @Get('')
  getUsers(@Query('id', ParseIntPipe) id: number) {
    try {
      if (id !== undefined) {
        const storeFind = this.storesServiceImplement.findOneStore(id);
        if (!storeFind) {
          throw new NotFoundException('Store not found');
        }
        return storeFind;
      }
      return this.storesServiceImplement.findAllStores();
    } catch (error) {
      return error;
    }
  }

  @Get('/Details_StoreProducts')
  getDetails(@Query('id', ParseIntPipe) id: number) {
    try {
      if (id !== undefined) {
        const detailFind = this.storesServiceImplement.findOneDetail(id);
        if (!detailFind) {
          throw new NotFoundException('Detail not found');
        }
        return detailFind;
      }
      return this.storesServiceImplement.findAllDetails();
    } catch (error) {
      return error;
    }
  }

  @Post('')
  async createStore(@Body() data: createStoretDTO) {
    try {
      const { user_fk } = data;

      const userExists = await this.usersServiceImplement.findOneUser(user_fk);

      if (!userExists) {
        return {
          status: 'Error',
          msg: 'The user does not exist, the store cannot be created..',
        };
      }

      const createdStore = await this.storesServiceImplement.createStore(data);
      if (!createdStore) {
        throw new NotFoundException('It was not possible to create the store');
      }
      return {
        status: 'Success',
        msg: 'Successfully created store',
      };
    } catch (error) {
      return error;
    }
  }

  @Post('/Details_StoreProducts')
  async createDetails_StoreProducts(
    @Body() data: createDetails_StoreProductDTO,
  ) {
    try {
      const createDetail = await this.storesServiceImplement.CreateDetail(data);

      if (!createDetail) {
        throw new NotFoundException(
          'It was not possible to create the store detail',
        );
      }

      return {
        status: 'Success',
        msg: 'Successfully created detail',
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  async updateStore(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateStoreDTO,
  ) {
    try {
      if (data.user_fk) {
        const userExists = await this.usersServiceImplement.findOneUser(
          data.user_fk,
        );
        if (!userExists) {
          throw new NotFoundException('The specified user does not exist.');
        }
      }
      const updatedStore = await this.storesServiceImplement.updateStore(
        id,
        data,
      );
      if (!updatedStore) {
        throw new NotFoundException(
          'It was not possible to update the category',
        );
      }
      return {
        status: 'Success',
        msg: `Store ${id} successfully updated`,
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  deleteStore(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedStore = this.storesServiceImplement.deleteStore(id);
      if (!deletedStore) {
        throw new NotFoundException('It was not possible to delete the store');
      }
      return deletedStore;
    } catch (error) {
      return error;
    }
  }

  @Delete('Details_StoreProducts/:id')
  deleteDetail(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleteDetail = this.storesServiceImplement.deleteDetail(id);
      if (!deleteDetail) {
        throw new NotFoundException('It was not possible to delete the detail');
      }
      return deleteDetail;
    } catch (error) {
      return error;
    }
  }
}
