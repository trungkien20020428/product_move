import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MoveProductDto {
  @IsNotEmpty()
  @ApiProperty({
    example: [1, 2, 3],
  })
  listId: number[];

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  productStatus: number;

  @IsNotEmpty()
  @ApiProperty({
    example: [34, 36, 35],
  })
  listProductId: number[];
}
