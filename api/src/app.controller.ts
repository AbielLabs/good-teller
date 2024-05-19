import { Controller, Get } from '@nestjs/common';

@Controller('helloworld')
export class AppController {
  @Get()
  getHello() {
    return 'Hello World';
  }
}
