import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto, idColumn: string) {
    await new this.todoModel({
      ...createTodoDto,
      status: 0,
      idColumn,
    }).save();
    return 'create successfully';
  }

  findAll() {
    return this.todoModel.find().exec();
  }

  findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async remove(id: string) {
    await this.todoModel.findByIdAndDelete(id).exec();
    return 'delete successfully';
  }
  getTasksByColumn(column: string) {
    return this.todoModel.find({ column: column }).exec();
  }
  deleteByColumn(columnId: string) {
    return this.todoModel.deleteMany({ column: columnId });
  }
}
