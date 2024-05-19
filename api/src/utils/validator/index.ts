import mongoose from 'mongoose';

export function validate_Id(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}
