import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from 'src/column/entities/column.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    @InjectModel(Column.name) private columnModel: Model<Column>,
  ) {}

  async create(createTodoDto: CreateTodoDto, idColumn: string) {
    const newTodo = await new this.todoModel({
      ...createTodoDto,
      status: 0,
      idColumn,
    }).save();
    await this.columnModel.findByIdAndUpdate(createTodoDto.column, {
      $push: { taskList: newTodo._id },
    });
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
    const task = await this.todoModel.findById(id).exec();
    const columnId = task.column;
    await this.todoModel.findByIdAndDelete(id).exec();
    await this.columnModel.findByIdAndUpdate(columnId, {
      $pull: { taskList: id },
    });
    return 'delete successfully';
  }
  getTasksByColumn(column: string) {
    return this.todoModel.find({ column: column }).exec();
  }
  deleteByColumn(columnId: string) {
    return this.todoModel.deleteMany({ column: columnId });
  }

  async swapTask(taskId) {
    console.log(taskId);
    const tak = await this.todoModel.findById(taskId.taskId).exec();
    // remove from old col
    await this.columnModel.findByIdAndUpdate(tak.column, {
      $pull: { taskList: taskId.taskId },
    });
    // const column = await this.columnModel.findOne(cId).exec();
    // update to new col
    await this.columnModel.findByIdAndUpdate(taskId.columnDsc, {
      $push: {
        taskList: {
          $each: [taskId.taskId],
          $position: { $indexOfArray: [taskId.taskId] },
        },
      },
    });
  }
}
