import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpRoute } from 'src/constants';

import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { JWTGuard } from 'src/api/auth/guards/jwt.Guard';
import { ErrorInterceptor } from 'src/errors/interceptors/exrror.interceptor';
import { GetCurrentAccountId } from 'src/decorators';
import { User } from '../model/user.model';
import { TUserRole } from '../types';
import { OnlyAdmins } from 'src/api/auth/guards/role.guard';
import { OnlySubscribedUsers } from 'src/api/auth/guards/subscription.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserInterceptor } from '../interceptors/user.interceptor';

@ApiTags('User')
@UseGuards(JWTGuard)
@UseInterceptors(new ErrorInterceptor())
@UseGuards(OnlySubscribedUsers)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //restricted for admins alone
  @UseGuards(OnlyAdmins)
  @Post('/')
  async createUser(
    @Body() createUserDTO: CreateUserDto,
    @GetCurrentAccountId() firm_id: string,
  ) {
    console.log(createUserDTO);
    return await this.userService.createUser(createUserDTO, firm_id);
  }

  //restricted for admins alone
  @UseGuards(OnlyAdmins)
  @UseInterceptors(UserInterceptor)
  @Get(HttpRoute.WITHOUT_PARAM)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  //restricted for admins alone
  @UseGuards(OnlyAdmins)
  @UseInterceptors(UserInterceptor)
  @Get(HttpRoute.WITHOUT_PARAM)
  async getAllUsersByFirm(
    @GetCurrentAccountId() firm_id: string,
  ): Promise<User[]> {
    return await this.userService.getAllUsersByFirm(firm_id);
  }

  @Get(HttpRoute.WITH_ID_PARAM)
  @UseInterceptors(UserInterceptor)
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Patch(HttpRoute.WITH_ID_PARAM)
  @UseInterceptors(UserInterceptor)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  //restricted for admins alone
  @UseGuards(OnlyAdmins)
  @Patch('role' + HttpRoute.WITH_ID_PARAM)
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: TUserRole,
  ): Promise<void> {
    return await this.userService.changeUserRole(id, role);
  }

  @Patch('change-password' + HttpRoute.WITH_ID_PARAM)
  async updateUserPassword(
    @Param('id') id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ): Promise<void> {
    return await this.userService.updateUserPassword(
      id,
      oldPassword,
      newPassword,
    );
  }

  //restricted for admins alone
  @UseGuards(OnlyAdmins)
  @Delete(HttpRoute.WITH_ID_PARAM)
  @UseInterceptors(UserInterceptor)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
