import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'dat@vnu.edu.vn',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'Example@1234',
  })
  password: string;
}
