import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpRoute } from 'src/constants';

import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { JWTGuard } from 'src/api/auth/guards/jwt.Guard';
import { ErrorInterceptor } from 'src/errors/interceptors/exrror.interceptor';

@UseGuards(JWTGuard)
@UseInterceptors(new ErrorInterceptor())
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(HttpRoute.WITHOUT_PARAM)
  async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.service.getAllUsers();
  }

  @Get(HttpRoute.WITH_ID_PARAM)
  async getUserById(@Param('id') id: string): Promise<CreateUserDto> {
    return await this.service.getUserById(id);
  }

  @Patch(HttpRoute.WITH_ID_PARAM)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<CreateUserDto> {
    return await this.service.updateUser(id, updateUserDto);
  }

  @Get(HttpRoute.WITH_ID_PARAM)
  async deleteUser(@Param('id') id: string): Promise<CreateUserDto> {
    return await this.service.deleteUser(id);
  }
}
