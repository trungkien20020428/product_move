import { Inject, Injectable } from '@nestjs/common';
import { UserValidate } from '../../users/validate/users.validate';
import ProductsModel from '../entities/product.entity';
import { validate } from '../../type/global.type';

@Injectable()
export class productValidate {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private ProductRespiratory: typeof ProductsModel,
    private readonly userValidate: UserValidate,
  ) {}

  async validateCreateProduct(userId): validate {
    return await this.userValidate.validateDirector(userId);
  }

  async validateActiveProduct(userId): validate {
    return {
      message: '',
      success: true,
    };
  }
}
