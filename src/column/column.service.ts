import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Board } from 'src/board/entities/board.entity';
import { TodoService } from 'src/todo/todo.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<Column>,
    @InjectModel(Board.name) private boardModel: Model<Board>,
    private readonly todoService: TodoService,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    // const findRank = await this.columnModel.aggregate([
    //   { $unwind: '$rank' },
    //   { $group: { _id: null, max_value: { $max: '$rank' } } },
    //   { $project: { _id: 0, max_value: 1 } },
    // ]);

    // let rank: number;
    // if (findRank && findRank.length > 0) {
    //   rank = findRank[0].max_value + 1;
    // } else {
    //   rank = 0;
    // }

    const newColumn = await new this.columnModel({
      ...createColumnDto,
      // rank,
      taskList: [],
    }).save();
    await this.boardModel.findByIdAndUpdate(newColumn.boardId, {
      $push: { boardList: newColumn._id },
    });
    return 'create successfully';
  }

  async findAll() {
    const res = await this.columnModel.find().populate('taskList').exec();
    console.log(res);
    return res;
  }

  findOne(id: string) {
    return this.columnModel.findById(id).populate('taskList').exec();
  }

  update(id: string, updateColumnDto: UpdateColumnDto) {
    return this.columnModel.findByIdAndUpdate(id, updateColumnDto).exec();
  }

  async remove(id: string) {
    const column = this.columnModel.findById(id).exec();
    await this.columnModel.findByIdAndDelete(id).exec();
    await this.todoService.deleteByColumn(id);
    const columnId = (await column).boardId;
    await this.boardModel.findByIdAndUpdate(columnId, {
      $pull: { boardList: id },
    });
    return 'delete successfully';
  }

  async mergerColumnAndTask() {
    const data = await this.columnModel.aggregate([
      {
        $lookup: {
          from: 'todos',
          localField: '_id',
          foreignField: 'column',
          as: 'todos',
        },
      },
      {
        $sort: { rank: 1 },
      },
    ]);
    return data;
  }
  async updateSwap(
    columnEnd: string,
    columnStart: string,
    task_id: string,
    index: number,
  ) {
    await this.columnModel.findByIdAndUpdate(columnStart, {
      $pull: { taskList: task_id },
    });
    await this.columnModel.findByIdAndUpdate(columnEnd, {
      $push: {
        taskList: {
          $each: [task_id],
          $position: index,
        },
      },
    });
  }
  async findIndex(columnId: string, taskId: string) {
    return await this.columnModel.aggregate([
      { $match: { _id: columnId } },
      {
        $project: {
          index: {
            $indexOfArray: ['$taskList', taskId],
          },
        },
      },
    ]);
  }
}
