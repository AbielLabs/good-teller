import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Subscription {
  @Prop({ required: true })
  firm_id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, default: new Date(Date.now()) })
  subscription_start_date: Date;

  @Prop({ required: true })
  subscription_end_date: Date;
}

export const SubscriptionModel = SchemaFactory.createForClass(Subscription);
