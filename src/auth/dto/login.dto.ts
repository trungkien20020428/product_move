import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'email@example.com',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'Example@1234',
  })
  password: string;
}
