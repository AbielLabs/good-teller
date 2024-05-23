import { configs } from 'src/configs';

export const mailCredential = {
  transport: {
    host: configs.MAIL_HOST,
    port: configs.MAIL_PORT,
    secure: false,
    auth: {
      user: configs.MAIL_USER,
      pass: configs.MAIL_PASSWORD,
    },
    defaults: {
      from: configs.MAIL_SENDER,
    },
  },
};
