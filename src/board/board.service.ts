import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}
  findAll() {
    return this.boardModel.find().exec();
  }
  create(createBoardDto: CreateBoardDto) {
    return new this.boardModel({
      ...createBoardDto,
    }).save();
  }
  async update(column, index) {
    await this.boardModel.findByIdAndUpdate(column.boardId, {
      $pull: { boardList: column._id },
    });
    await this.boardModel.findByIdAndUpdate(column._id, {
      $push: {
        boardList: {
          $each: [column._id],
          $position: { $indexOfArray: index },
        },
      },
    });
  }
}
