import { Inject, Injectable } from '@nestjs/common';
import ProductMoveModel from '../Models/product_move.model';
import { PRODUCT_MOVE } from '../constance/productMove_status.constance';

@Injectable()
export class productMoveService {
  constructor(
    @Inject('PRODUCT_MOVE_REPOSITORY')
    private ProductMovesRepository: typeof ProductMoveModel,
  ) {}

  async listFrom(id, from = true) {
    if (from) {
      return await this.ProductMovesRepository.findAll({
        where: { from: id },
      });
    }
    return await this.ProductMovesRepository.findAll({
      where: { to: id },
    });
  }
  async move(uid, moveProductDto) {
    const { ids } = moveProductDto;
    const mv = await this.ProductMovesRepository.update(
      {
        status: PRODUCT_MOVE.ACCEPT,
        isPending: true,
      },
      {
        where: {
          id: ids,
          from: uid,
        },
      },
    );
    return mv;
  }

  async receive(uid, moveProductDto) {
    const { ids } = moveProductDto;
    await this.ProductMovesRepository.update(
      {
        isPending: false,
      },
      {
        where: {
          to: uid,
          id: ids,
        },
      },
    ).catch((err) => {
      console.log(err);
    });

    return;
  }
}
