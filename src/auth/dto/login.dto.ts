import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'factory@product_move.com',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    example: '123456789',
  })
  password: string;
}
