import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('column')
@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }

  @Get()
  findAll() {
    return this.columnService.findAll();
  }

  @Get('column-task')
  mergerColumnAndTask() {
    return this.columnService.mergerColumnAndTask();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnService.update(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.remove(id);
  }
  @Post('update')
  updateTaskList(
    @Body()
    updateData: {
      columnEnd: string;
      columnStart: string;
      task_id: string;
      index: number;
    },
  ) {
    const { columnEnd, columnStart, task_id, index } = updateData;
    return this.columnService.updateSwap(
      columnEnd,
      columnStart,
      task_id,
      index,
    );
  }
  @Post('index')
  findIndex(@Body() columnId: string, taskId: string) {
    return this.columnService.findIndex(columnId, taskId);
  }
}
