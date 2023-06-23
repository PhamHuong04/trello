import { Column } from 'src/column/entities/column.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TodoDocument = mongoose.HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop()
  id: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true })
  column: Column;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
