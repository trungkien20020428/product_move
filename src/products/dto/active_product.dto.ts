import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActiveProductDto {
  @IsNotEmpty()
  @ApiProperty({
    example: [3, 4, 5, 6],
  })
  listId: number[];
}
