import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}
  findAll() {
    return this.boardModel.find().populate('boardList').exec();
  }
  create(createBoardDto: CreateBoardDto) {
    return new this.boardModel({
      ...createBoardDto,
    }).save();
  }
  async update(column_id: string, boardId: string, index: number) {
    await this.boardModel.findByIdAndUpdate(boardId, {
      $pull: { boardList: column_id },
    });
    await this.boardModel.findByIdAndUpdate(boardId, {
      $push: {
        boardList: {
          $each: [column_id],
          $position: index,
        },
      },
    });
  }
}
