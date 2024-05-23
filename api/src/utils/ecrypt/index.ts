import * as bcrypt from 'bcrypt';

export function createHash(data: string): string {
  return bcrypt.hashSync(data, 10);
}

export function verifyHash(providedData: string, hashedData: string): boolean {
  return bcrypt.compareSync(providedData, hashedData);
}
