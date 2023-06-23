import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(@InjectModel(Column.name) private columnModel: Model<Column>) {}

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
    return 'delete successfully';
  }
}
