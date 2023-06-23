import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  content: string;

  status: 0;

  column: string;
}
