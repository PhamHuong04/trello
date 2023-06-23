import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty({ description: 'Some thing', default: 1, type: Number })
  @IsNumber()
  status: 0;

  @ApiProperty()
  @IsNotEmpty()
  column: string;
}
