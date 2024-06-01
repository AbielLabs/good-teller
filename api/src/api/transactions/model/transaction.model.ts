import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Firm } from 'src/api/firm/model/firm.model';
import { User } from 'src/api/user/model/user.model';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: false })
  description?: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Firm' })
  firm_id: Firm;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const TransactionModel = SchemaFactory.createForClass(Transaction);
