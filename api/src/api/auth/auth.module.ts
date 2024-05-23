import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './controller/auth.controller';
import { UserService } from '../user/services/user.service';
import { UserRepository } from '../user/repositories/user.repository';
import {
  EmailVerification,
  EmailVerificationModel,
} from './model/email-verication.model';
import { User, UserModel } from '../user/model/user.model';
import { AuthService } from './service/auth.service';
import { Mail } from 'src/mail/mail.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EmailVerification.name,
        schema: EmailVerificationModel,
      },
      {
        name: User.name,
        schema: UserModel,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    UserRepository,
    AuthService,
    Mail,
    LocalStrategy,
    JWTStrategy,
  ],
})
export class AuthModule {}
