import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @ApiProperty()
  @Post('login')
  async login(@Body() loginDto: loginDto) {
    return this.authService.validate(loginDto);
  }
}
