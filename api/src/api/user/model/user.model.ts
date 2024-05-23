import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  phone?: number;

  @Prop({ required: true })
  isVerified: boolean;
}

export const UserModel = SchemaFactory.createForClass(User);
