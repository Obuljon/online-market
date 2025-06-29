import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ShoppingDocument = HydratedDocument<Shopping>;

@Schema()
export class Shopping {
  @Prop()
  user_id: Types.ObjectId;

  @Prop()
  product_list: Types.ObjectId[];

  @Prop()
  total_price: number;

  @Prop()
  payment_made: boolean;

  @Prop()
  delivered: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ShoppingSchema = SchemaFactory.createForClass(Shopping);
