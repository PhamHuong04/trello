import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from 'src/todo/entities/todo.entity';
import { TodoService } from 'src/todo/todo.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<Column>,
    private readonly todoService: TodoService,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    await new this.columnModel({
      ...createColumnDto,
    }).save();
    return 'create successfully';
  }

  findAll() {
    return this.columnModel.find().exec();
  }

  findOne(id: string) {
    return this.columnModel.findById(id).exec();
  }

  update(id: string, updateColumnDto: UpdateColumnDto) {
    return this.columnModel.findByIdAndUpdate(id, updateColumnDto).exec();
  }

  async remove(id: string) {
    await this.columnModel.findByIdAndDelete(id).exec();
    await this.todoService.deleteByColumn(id);
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
    ]);
    return data;
  }
}
