import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SellProductDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Le thi Bich',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '092239211',
  })
  phone: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Bac Ninh',
  })
  address: string;
}
