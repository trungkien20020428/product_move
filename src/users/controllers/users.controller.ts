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
import { UpdateUserInformationDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserValidate } from '../validate/users.validate';
import { resType } from 'src/type/global.type';

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

    if (!validate.success) {
      return validate;
    }
    const userCreated = await this.usersService.create(createUserDto);
    if (!userCreated) {
      return {
        code: 401,
        success: false,
        message: 'Can not create users',
        result: {},
      };
    }
    return {
      code: 201,
      success: true,
      message: 'Create user success',
      result: {
        userCreated,
      },
    };
  }

  @ApiBearerAuth()
  @Get()
  async findAll(@Request() req) {
    const currentUserId = req.user.id;
    const validate = await this.userValidate.validateGetAllUsers(currentUserId);
    if (!validate.success) {
      return {
        code: 401,
        success: false,
        message: 'You cannot have permission for this feature !',
        result: {},
      };
    }
    return this.usersService.findAll();
  }
  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Body() updateUserInformationDto: UpdateUserInformationDto,
    @Request() req,
    @Param('id') id: string,
  ) :resType{
    const currentUserId = req.user.id;
    const validate = await this.userValidate.validateDirector(currentUserId);
    const resFailed = {
      code: 401,
      success: false,
      message: 'can not update user',
      result: {},
    }
    if(!validate.success){
      resFailed.message = validate.message;
      return resFailed;
    }
    const success = await this.usersService.updateUserInformation(
      +id,
      updateUserInformationDto,
    );
    console.log('wtf',success);
    if(success) {
      return {
        code :201,
        success:true,
        message:'Update user success',
        result:{},
      }
    }
    return resFailed;

  }
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const currentUserId = req.user.id;
    const validate = await this.userValidate.validateDeleteUsers(
      currentUserId,
      id,
    );
    if (!validate.success) {
      return {
        code: 401,
        success: false,
        message: validate.message,
        result: {},
      };
    }
    await this.usersService.remove(+id);
    return {
      code: 200,
      success: true,
      message: 'delete user success',
      result: {},
    };
  }
}
