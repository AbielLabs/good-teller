import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Transaction } from 'src/api/transactions/model/transaction.model';
import { User } from 'src/api/user/model/user.model';

@Schema()
export class Firm extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  accountType: 'admin';

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ required: true, default: false })
  isSubscribed: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    required: false,
  })
  users?: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    required: false,
  })
  transactions?: Transaction[];
}

export const FirmModel = SchemaFactory.createForClass(Firm);
