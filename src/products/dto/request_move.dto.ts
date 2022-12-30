import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class RequestMoveDto {
  @IsNotEmpty()
  @ApiProperty({ example: 3 })
  productId: number;

  @IsNotEmpty()
  @ApiProperty({ example: 4 })
  moveId: number;
}
