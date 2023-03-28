import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserInformationDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  displayName?: string;
  @IsNotEmpty()
  phone?: string;
}

export class UpdateUserPasswordDto {
  password: string;
}
