import { Inject, Injectable } from '@nestjs/common';
import ProductMoveModel from '../Models/product_move.model';
import { PRODUCT_MOVE } from '../constance/productMove_status.constance';
import ProductsModel from '../Models/product.model';
import ProductWarehousesModel from '../Models/product_warehouse.model';

@Injectable()
export class productMoveService {
  constructor(
    @Inject('PRODUCT_MOVE_REPOSITORY')
    private ProductMovesRepository: typeof ProductMoveModel,

    @Inject('PRODUCT_WAREHOUSE')
    private ProductWarehouseRepository: typeof ProductWarehousesModel,
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
      include: [{ model: ProductsModel }],
      where: { to: id, isPending: true, status: PRODUCT_MOVE.ACCEPT },
    });
  }
  async move(uid, moveProductDto) {
    const { listId, productStatus, listProductId } = moveProductDto;

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
        returning: true,
      },
    );
    await this.ProductWarehouseRepository.update(
      {
        status: productStatus,
      },
      {
        where: {
          product_id: listProductId,
        },
      },
    );

    return mv;
  }

  async receive(uid, moveProductDto) {
    const { listId, productStatus, listProductId } = moveProductDto;
    await this.ProductMovesRepository.update(
      {
        isPending: false,
      },
      {
        where: {
          to: uid,
          id: listId,
        },
      },
    ).catch((err) => {
      console.log(err);
    });
    await this.ProductWarehouseRepository.update(
      {
        status: productStatus,
        user_id: uid,
      },
      {
        where: {
          product_id: listProductId,
        },
      },
    );

    return;
  }
}
