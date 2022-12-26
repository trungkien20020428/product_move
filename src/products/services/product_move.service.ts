import { Inject, Injectable } from '@nestjs/common';
import ProductMoveModel from '../Models/product_move.model';
import { PRODUCT_MOVE } from '../constance/productMove_status.constance';
import ProductsModel from '../Models/product.model';
import ProductWarehousesModel from '../Models/product_warehouse.model';
import User from 'src/users/entities/user.entity';

@Injectable()
export class productMoveService {
  constructor(
    @Inject('PRODUCT_MOVE_REPOSITORY')
    private ProductMovesRepository: typeof ProductMoveModel,
  ) {}

  async listFrom(id, from = true) {
    if (from) {
      return await this.ProductMovesRepository.findAll({
        include: [
          {
            model: ProductsModel,
          },
        ],

        where: { from: id, status: PRODUCT_MOVE.REQUEST },
      });
    }
    return await this.ProductMovesRepository.findAll({
      where: { to: id, isPending: true },
    });
  }
  async move(uid, moveProductDto) {
    const { listId } = moveProductDto;

    console.log({uid})
    const mv = await this.ProductMovesRepository.update(
      {
        status: PRODUCT_MOVE.ACCEPT,
        isPending: true,
      },
      {
        where: {
          id: listId,
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
