import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ColumnDocument = mongoose.HydratedDocument<Column>;
@Schema()
export class Column {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
