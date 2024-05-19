import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { configs } from './configs';
import { mailCredential } from './mail/credentials.mail';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './api/auth/strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: configs.JWT_SECRET,
      signOptions: {
        expiresIn: configs.JWT_EXPIRES_IN,
      },
    }),
    MailerModule.forRootAsync({
      useFactory: async () => mailCredential,
    }),
    MongooseModule.forRoot(configs.MONGO_URI),
    PassportModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JWTStrategy],
  exports: [MailerModule, JwtModule, PassportModule],
})
export class AppModule {}
