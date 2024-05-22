import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Testing Default')
@Controller()
export class AppController {
  // // Receive parameters with Param

  @Get('/testOne/:id')
  testOne(@Param('id') id: String): string {
    return `This is a test with id ${id}`;
  }

  @Get('/testTwo/:msg')
  testTwo(@Param('') params: any): string {
    return `this is the message: ${params.msg}`;
  }

  // Receive parameters with Query

  @Get('/testThree')
  testThree(@Query() params: any): String {
    const { limit, offset } = params;
    return `Products: Limit => ${limit}, offset => ${offset}`;
  }

  @Get('/testFour')
  testFour(@Query('msg') msg: String) {
    if (msg) {
      return `This is the message: ${msg}`;
    }
    return 'There is no message';
  }
}
