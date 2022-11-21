import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'kienhooang@gmail.com',
  })
  email: string;
  @IsNotEmpty()
  @ApiProperty({
    example: '123456789',
  })
  password: string;
  @IsNotEmpty()
  @ApiProperty({
    example: '0923481232',
  })
  phone: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'kien_hoang',
  })
  displayName: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 4,
  })
  roleId: number;
}
