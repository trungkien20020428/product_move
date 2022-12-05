import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProductLineDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'VINFAST_01',
  })
  name: string;
}
