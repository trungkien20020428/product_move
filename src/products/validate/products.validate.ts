import { Inject, Injectable } from '@nestjs/common';
import ProductLineModel from '../entities/product_lines.entity';
import User from '../../users/entities/user.entity';
import { Role } from '../../users/constance/user.constance';

@Injectable()
export class productValidate {
  constructor(
    @Inject('PRODUCT_LINES_REPOSITORY')
    private ProductLinesRepository: typeof ProductLineModel,
    @Inject('USERS_REPOSITORY')
    private UsersRepository: typeof User,
  ) {}
  async validateAddNewProductLine(productLineName, currentUserId) {
    const currentUser = await this.UsersRepository.findOne({
      where: {
        id: currentUserId,
      },
    });
    if (currentUser.roleId != Role.DIRECTOR) {
      return {
        isValid: true,
        message: 'Permission',
      };
    }
    const productLine = await this.ProductLinesRepository.findOne({
      where: { name: productLineName },
    });
    if (productLine) {
      return {
        isValid: true,
        message: 'product line is available',
      };
    }
    return {
      isValid: false,
      message: '',
    };
  }
}
