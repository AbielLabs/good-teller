import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../service/auth.service';
import { ErrorInterceptor } from 'src/errors/interceptors/exrror.interceptor';
import { LocalGuard } from '../guards/local.guard';
import { JWTGuard } from '../guards/jwt.Guard';
import { CreateFirmDto } from 'src/api/firm/dto/create-firm.dto';
import {
  GetCurrentAccountId,
  GetCurrentAccountType,
  GetFirmId,
} from 'src/decorators';

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(new ErrorInterceptor())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description:
      'please click on the verication link sent to your email to complete verification.',
  })
  async register(@Body() createUserDTO: CreateFirmDto): Promise<void> {
    return await this.authService.registerFirm(createUserDTO);
  }

  @Post('verify-email')
  @ApiCreatedResponse({
    description:
      'account has been successfully created, please  proceed to login.',
  })
  async verifyEmail(@Param('otp') otp: number): Promise<void> {
    return await this.authService.verifyEmailToken(otp);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  @ApiCreatedResponse({
    description: 'login successful.',
  })
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.validateUser({ email, password });
  }

  //not implemented yet
  @UseGuards(JWTGuard)
  @Post('logout')
  async signout(
    @GetCurrentAccountId() id: string,
    @GetCurrentAccountType() type: string,
    @GetFirmId() firm: string,
  ) {
    console.log(id);
    console.log(type);
    console.log(firm);
  }

  @Post('forgot-password')
  async recoverPassword(@Body('email') email: string): Promise<void> {
    return await this.authService.recoverPassword(email);
  }

  @Post('confirm-password-recovery')
  async confirmPasswordRecovery(
    @Body('otp') otp: number,
    @Body('password') password: string,
  ) {
    return await this.authService.confirmPasswordRecovery(otp, password);
  }
}
