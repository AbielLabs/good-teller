import * as speakeasy from 'speakeasy';
import { configs } from 'src/configs';

type TOTP = {
  secret: string;
  token: number;
};

// Function to generate a TOTP token for email
export function generateTOTPToken(): TOTP {
  const { base32: secret } = speakeasy.generateSecret();

  const token = speakeasy.totp({
    secret: secret,
    encoding: configs.OTP_ENCODING,
    step: configs.OTP_STEP,
  });
  return { secret, token };
}

// Function to validate a TOTP token
export function validateTOTP({ secret, token }: TOTP): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: configs.OTP_ENCODING,
    token: token.toString(),
    step: configs.OTP_STEP,
    window: 1,
  });
}
