import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Address } from 'nodemailer/lib/mailer';
import { emailFormat } from 'src/utils/email-formater';

export type SendMail = {
  recipient: Address[] | Address | string;
  subject: string;
  body: string;
};

@Injectable()
export class Mail {
  constructor(private readonly service: MailerService) {}

  async send({ recipient, subject, body }: SendMail) {
    return await this.service.sendMail({
      to: recipient,
      subject,
      html: body,
    });
  }

  async sendVerificationMail(
    recipient: Address | string,
    otp: number,
    type: 'email-OTP' | 'password-OTP',
  ) {
    const body: string = emailFormat(type, otp);

    return this.send({
      recipient,
      subject: type === 'email-OTP' ? 'Email Verification Code' : ' OTP Code',
      body,
    });
  }
}
