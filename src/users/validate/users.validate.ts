import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../constance/user.constance';
import User from '../entities/user.entity';

@Injectable()
export class UserValidate {
  constructor(
    @Inject('USERS_REPOSITORY')
    private UsersRepository: typeof User,
  ) {}
  async validateCreateUser(currentUserId, cerateUserDto) {
    const { email } = cerateUserDto;
    const user = await this.UsersRepository.findOne({
      raw: true,
      where: {
        email,
      },
    });
    const currentUser = await this.UsersRepository.findOne({
      raw: true,
      where: {
        id: currentUserId,
      },
    });
    if (currentUser.roleId == Role.DIRECTOR && !user) {
      return {
        success: true,
        messeage: '',
      };
    }
    return {
      success: false,
      messeage: 'You can not create new user',
    };
  }

  async validateGetAllUsers(userId) {
    const user = await this.UsersRepository.findOne({
      raw: true,
      where: {
        id: userId,
      },
    });
    if (user.roleId != Role.DIRECTOR) {
      return {
        success: false,
        messeage: 'You can not have permision for this!',
      };
    }
    return {
      success: true,
      messeage: '',
    };
  }
}
