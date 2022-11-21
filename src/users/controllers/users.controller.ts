import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserValidate } from '../validate/users.validate';

@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userValidate: UserValidate,
  ) {}

  @ApiBearerAuth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const currentUserId = req.user.id;
    const validate = await this.userValidate.validateCreateUser(
      currentUserId,
      createUserDto,
    );
    console.log({ validate });
    if (!validate.success) {
      return validate;
    }
    const userCreated = await this.usersService.create(createUserDto);
    if (!userCreated) {
      return {
        code: 401,
        success: false,
        messeage: 'Can not create users',
        result: {},
      };
    }
    return {
      code: 201,
      success: true,
      messeage: 'Create user success',
      result: {
        userCreated,
      },
    };
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
