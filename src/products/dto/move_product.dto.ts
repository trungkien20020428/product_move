import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MoveProductDto {
  @IsNotEmpty()
  @ApiProperty({
    example: [1, 2, 3],
  })
  listId: number[];
}
