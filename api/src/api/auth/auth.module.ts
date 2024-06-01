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
import { Mail } from 'src/mail/service/mail.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { FirmService } from '../firm/service/firm.service';
import { FirmRepository } from '../firm/repository/firm.repository';
import { Firm, FirmModel } from '../firm/model/firm.model';

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
      {
        name: Firm.name,
        schema: FirmModel,
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
    FirmService,
    FirmRepository,
  ],

  exports: [
    MongooseModule.forFeature([
      {
        name: EmailVerification.name,
        schema: EmailVerificationModel,
      },
      {
        name: User.name,
        schema: UserModel,
      },
      {
        name: Firm.name,
        schema: FirmModel,
      },
    ]),
    UserService,
    UserRepository,
    AuthService,
    Mail,
    LocalStrategy,
    JWTStrategy,
    FirmService,
    FirmRepository,
  ],
})
export class AuthModule {}
