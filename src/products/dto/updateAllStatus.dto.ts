import { ApiProperty } from '@nestjs/swagger';

export class UpdateAllStatusDto {
  @ApiProperty({ example: 2 })
  product_line_id: number;
}
