import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import User from '../entities/user.entity';
const bcrypt = require('bcrypt');
const salt = 10;
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private UsersRepository: typeof User,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, displayName, phone, roleId } = createUserDto;
    console.log({ createUserDto });
    const hash = await bcrypt.hash(password, salt);
    console.log({ hash });
    const user = await this.UsersRepository.create({
      email,
      hash,
      displayName,
      phone,
      roleId,
    });
    return user;
  }

  findAll() {
    return this.UsersRepository.findAll({});
  }

  findOne(email: string) {
    return this.UsersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
