import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, HydrateOptions } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop()
  stock: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
