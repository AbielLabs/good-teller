import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Firm } from 'src/api/firm/model/firm.model';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: 'user';

  @Prop({ required: true })
  accountType: 'user';

  @Prop({ required: true })
  isVerified: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Firm ' })
  firm_id: Firm;
}

export const UserModel = SchemaFactory.createForClass(User);
