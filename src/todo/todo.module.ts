import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoService } from './todo.service';
import { ColumnService } from './../column/column.service';
import { TodoController } from './todo.controller';
import { Todo, TodoSchema } from './entities/todo.entity';
import { Column, ColumnSchema } from 'src/column/entities/column.entity';
import { Board, BoardSchema } from 'src/board/entities/board.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService, ColumnService],
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Board.name, schema: BoardSchema },
    ]),
  ],
})
export class TodoModule {}
