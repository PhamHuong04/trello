import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Column, ColumnSchema } from 'src/column/entities/column.entity';
import { Board, BoardSchema } from './entities/board.entity';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
  ],
})
export class BoardModule {}
