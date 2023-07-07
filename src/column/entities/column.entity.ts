import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { Todo } from 'src/todo/entities/todo.entity';

export type ColumnDocument = mongoose.HydratedDocument<Column>;
@Schema()
export class Column {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  rank: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    default: [],
  })
  taskList: Array<string>[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
