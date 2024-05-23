import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from 'src/api/user/dto/user.dto';
import { AuthService } from '../service/auth.service';
import { ErrorInterceptor } from 'src/errors/interceptors/exrror.interceptor';
import { LocalGuard } from '../guards/local.guard';
import { JWTGuard } from '../guards/jwt.Guard';

@Controller('auth')
@UseInterceptors(new ErrorInterceptor())
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDto): Promise<string> {
    return await this.service.registerUser(createUserDTO);
  }

  @Post('verify-email')
  async verifyEmail(@Body('otp', ParseIntPipe) otp: number): Promise<string> {
    return await this.service.verifyEmailToken(otp);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.service.validateUser({ email, password });
  }

  //not implemented yet
  @UseGuards(JWTGuard)
  @Post('logout')
  async signout() {}

  @Post('forgot-password')
  async recoverPassword(@Body('email') email: string) {
    return await this.service.recoverPassword(email);
  }

  @Post('confirm-password-recovery')
  async confirmPasswordRecovery(
    @Body('otp', ParseIntPipe) otp: number,
    @Body('password') password: string,
  ) {
    return await this.service.confirmPasswordRecovery(otp, password);
  }
}
