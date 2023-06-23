import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Model } from 'mongoose';
import { TodoDocument } from 'src/todo/entities/todo.entity';

@Schema()
export class Column {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);

export const ColumnSchemaFactory = (todo_model: Model<TodoDocument>) => {
  const column_schema = ColumnSchema;

  column_schema.pre('findOneAndDelete', async function (next: NextFunction) {
    // OTHER USEFUL METHOD: getOptions, getPopulatedPaths, getQuery = getFilter, getUpdate
    const column = await this.model.findOne(this.getFilter());
    await Promise.all([
      todo_model
        .deleteMany({
          column: column._id,
        })
        .exec(),
    ]);
    return next();
  });
  return column_schema;
};
