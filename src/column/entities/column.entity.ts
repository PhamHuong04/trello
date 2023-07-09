import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Board } from 'src/board/entities/board.entity';

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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
    default: '64aa296dd011b93a75b8de49',
  })
  boardId: Board;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
