import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductLineDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'VINFAST_01',
  })
  name: string;
}
