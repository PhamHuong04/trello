import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  Column,
  ColumnSchema,
  // ColumnSchemaFactory,
} from './entities/column.entity';
import { Todo, TodoSchema } from 'src/todo/entities/todo.entity';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
  imports: [
    MongooseModule.forFeature([
      { name: Column.name, schema: ColumnSchema },
      { name: Todo.name, schema: TodoSchema },
    ]),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: Column.name,
    //     useFactory: ColumnSchemaFactory,
    //     inject: [getModelToken(Todo.name)],
    //     imports: [
    //       MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    //     ],
    //   },
    // ]),
  ],
})
export class ColumnModule {}
