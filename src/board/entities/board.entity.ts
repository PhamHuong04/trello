import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Board {
  @Prop()
  id: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
    default: [],
  })
  boardList: Array<string>[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
