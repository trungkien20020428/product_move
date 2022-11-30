import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserInfomationDto extends PartialType(CreateUserDto) {
  displayName?: string;
  phone?: string;
}

export class UpdateUserPasswordDto {
  password: string;
}
