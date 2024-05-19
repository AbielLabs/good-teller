import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmailVerification {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  token: number;

  @Prop({ required: true })
  secret: string;
}

export const EmailVerificationModel =
  SchemaFactory.createForClass(EmailVerification);
