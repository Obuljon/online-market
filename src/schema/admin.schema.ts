import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
