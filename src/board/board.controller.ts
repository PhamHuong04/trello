import { CreateBoardDto } from './dto/create-board.dto';
import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { BoardService } from './board.service';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }
  @Post()
  @ApiBody({ type: CreateBoardDto })
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Post('update')
  update(
    @Body() updateData: { column_id: string; boardId: string; index: number },
  ) {
    const { column_id, boardId, index } = updateData;
    return this.boardService.update(column_id, boardId, index);
  }
}
