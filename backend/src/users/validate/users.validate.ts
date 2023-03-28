import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../constance/user.constance';
import User from '../entities/user.entity';

@Injectable()
export class UserValidate {
  private currentUser: any;
  constructor(
    @Inject('USERS_REPOSITORY')
    private UsersRepository: typeof User,
  ) {}
  async validateCreateUser(currentUserId, createUserDto) {
    const { email } = createUserDto;
    const validateDirector = await this.validateDirector(currentUserId);
    const validateDuplicate = await this.validateDuplicateUser(email);
    if (!validateDirector.success) {
      return validateDirector;
    }
    if (!validateDuplicate.success) {
      return validateDuplicate;
    }
    return {
      message: '',
      success: true,
    };
  }

  async validateGetAllUsers(userId) {
    const validateDirector = await this.validateDirector(userId);
    if (!validateDirector.success) {
      return validateDirector;
    }
    return {
      success: true,
      message: '',
    };
  }

  async validateDeleteUsers(currentUserId, id) {
    const user = await this.UsersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return {
        message: 'user is available deleted',
        success: false,
      };
    }
    const validateDirector = await this.validateDirector(currentUserId);
    return validateDirector;
  }

  async validateDuplicateUser(email) {
    const userByEmail = await this.UsersRepository.findOne({
      where: {
        email,
      },
    });
    if (userByEmail) {
      return {
        success: false,
        message: 'Duplicate error',
      };
    }
    return {
      success: true,
      message: '',
    };
  }
  async validateDirector(userId) {
    if (!this.currentUser) {
      this.currentUser = await this.UsersRepository.findOne({
        where: {
          id: userId,
        },
      });
    }
    if (!this.currentUser) {
      return {
        success: false,
        message: '',
      };
    }
    if (this.currentUser.roleId != Role.DIRECTOR) {
      return {
        success: false,
        message: 'Permission error',
      };
    }
    return {
      success: true,
      message: '',
    };
  }
}
