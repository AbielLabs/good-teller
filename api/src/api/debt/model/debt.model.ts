import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Debt {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  firm_id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  date: Date;
}

export const DebtModel = SchemaFactory.createForClass(Debt);
