import * as speakeasy from 'speakeasy';

type TOTP = {
  secret: string;
  token: number;
};

// Function to generate a TOTP token for email
export function generateTOTPToken(): TOTP {
  const { base32: secret } = speakeasy.generateSecret();

  const token = speakeasy.totp({
    secret: secret,
    encoding: 'base32',
    step: 60 * 5,
  });
  return { secret, token };
}

// Function to validate a TOTP token
export function validateTOTP({ secret, token }: TOTP): boolean {
  console.log(secret);
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: token.toString(),
    step: 60 * 5,
    window: 1,
  });
}
