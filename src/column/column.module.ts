import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { Column, ColumnSchema } from './entities/column.entity';
import { Todo, TodoSchema } from 'src/todo/entities/todo.entity';
import { TodoService } from 'src/todo/todo.service';
import { Board, BoardSchema } from 'src/board/entities/board.entity';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService, TodoService],
  imports: [
    MongooseModule.forFeature([
      { name: Column.name, schema: ColumnSchema },
      { name: Board.name, schema: BoardSchema },
      { name: Todo.name, schema: TodoSchema },
    ]),
  ],
})
export class ColumnModule {}
