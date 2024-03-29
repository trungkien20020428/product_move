import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UpdateUserInformationDto,
  UpdateUserPasswordDto,
} from '../dto/update-user.dto';
import User from '../entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
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
    const hash = await bcrypt.hash(password, salt);
    const user = await this.UsersRepository.create({
      email,
      hash,
      displayName,
      phone,
      roleId,
    });
    return user;
  }

  async findAll() {
    return await this.UsersRepository.findAll({
      attributes: ['email', 'displayName', 'phone', 'roleId', 'id'],
    });
  }

  findUserByEmail(email: string) {
    return this.UsersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async updateUserInformation(
    id: number,
    updateUserInformationDto: UpdateUserInformationDto,
  ) {
    const { displayName, phone, roleId, email, password } =
      updateUserInformationDto;
    if (displayName || phone || roleId || email) {
      await this.UsersRepository.update(
        { displayName, phone, roleId, email },
        {
          where: {
            id,
          },
        },
      ).catch((err) => {
        console.error(err);
      });
      return true;
    }
    return false;
  }

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const { password } = updateUserPasswordDto;
    const hash = await bcrypt.hash(password, salt);
    await this.UsersRepository.update(
      { hash },
      {
        where: {
          id,
        },
      },
    ).catch((err) => {
      console.error(err);
    });
  }

  async remove(id: number) {
    await this.UsersRepository.destroy({
      where: {
        id,
      },
    });
  }
}
