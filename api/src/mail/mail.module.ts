import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [MailerService],
  controllers: [],
})
export class MailModule {}
