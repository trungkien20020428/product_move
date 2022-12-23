import { Inject, Injectable } from '@nestjs/common';
import ProductMoveModel from '../Models/product_move.model';
import { validate } from '../../type/global.type';

@Injectable()
export class productMoveValidate {
  constructor(
    @Inject('PRODUCT_MOVE_REPOSITORY')
    private ProductMovesRepository: typeof ProductMoveModel,
  ) {}

  async validateAvailableMove(list): validate {
    const { ids } = list;

    const pv = await this.ProductMovesRepository.findAll({
      where: { id: ids },
    });

    if (pv.length != ids.length) {
      return {
        message: 'failed , value is not accept',
        success: false,
      };
    }
    return {
      message: '',
      success: true,
    };
  }
}
