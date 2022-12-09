import { Inject, Injectable } from '@nestjs/common';
import ProductLineModel from '../entities/product_lines.entity';
import User from '../../users/entities/user.entity';
import { Role } from '../../users/constance/user.constance';
import { UserValidate } from '../../users/validate/users.validate';
import { validate } from '../../type/global.type';

@Injectable()
export class productLineValidate {
  constructor(
    @Inject('PRODUCT_LINES_REPOSITORY')
    private ProductLinesRepository: typeof ProductLineModel,
    @Inject('USERS_REPOSITORY')
    private UsersRepository: typeof User,

    private readonly userValidate: UserValidate,
  ) {}
  async validateAddNewProductLine(productLineName, currentUserId) {
    const currentUser = await this.UsersRepository.findOne({
      where: {
        id: currentUserId,
      },
    });
    if (currentUser.roleId != Role.DIRECTOR) {
      return {
        success: false,
        message: 'Permission',
      };
    }
    const productLine = await this.ProductLinesRepository.findOne({
      where: { name: productLineName },
    });
    if (productLine) {
      return {
        success: false,
        message: 'product line is available',
      };
    }
    return {
      success: true,
      message: '',
    };
  }
  async validateRemoveProductLine(userId, productLineId): validate {
    const validateUser = await this.userValidate.validateDirector(userId);
    if (!validateUser.success) {
      return validateUser;
    }
    const productLine = await this.ProductLinesRepository.findOne({
      where: {
        id: productLineId,
      },
    });
    if (!productLine) {
      return {
        message: 'remove invalid',
        success: false,
      };
    }
    return {
      message: '',
      success: true,
    };
  }
}
