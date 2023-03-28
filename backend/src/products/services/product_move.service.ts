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
      const result = await this.ProductMovesRepository.findAll({
        where: { from: id, status: PRODUCT_MOVE.REQUEST },
        include: [
          {
            model: ProductsModel,
            where: {
              isCreate: true,
            },
          },
          {
            model: ProductWarehousesModel,
          },
        ],
      });
      return result;
    }
    const result = await this.ProductMovesRepository.findAll({
      include: [{ model: ProductsModel }, { model: ProductWarehousesModel }],
      where: { to: id, isPending: true, status: PRODUCT_MOVE.ACCEPT },
    });
    return result;
  }
  async move(uid, moveProductDto) {
    const { listId, listProductId } = moveProductDto;

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
    // await this.ProductWarehouseRepository.update(
    //   {
    //     status: productStatus,
    //   },
    //   {
    //     where: {
    //       product_id: listProductId,
    //     },
    //   },
    // );

    return mv;
  }

  async receive(uid, moveProductDto) {
    const { listId, listProductId } = moveProductDto;
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

  async requestArrayMove(currentId, productIds, moveId) {
    for (let i = 0; i < productIds.length; i++) {
      const product_warehouse_id = '22000001' + 'COM' + productIds[i];
      const result = await this.ProductMovesRepository.create({
        from: currentId,
        product_id: productIds[i],
        status: PRODUCT_MOVE.REQUEST,
        isPending: false,
        to: moveId,
        product_warehouse_id,
      });
    }
    return;
  }

  async requestMove(currentId, productId, moveId) {
    const product_warehouse_id = '22000001' + 'COM' + productId;
    const [result] = await Promise.all([
      this.ProductMovesRepository.create({
        from: currentId,
        product_id: productId,
        status: PRODUCT_MOVE.REQUEST,
        isPending: false,
        to: moveId,
        product_warehouse_id,
      }),
    ]);
    return result;
  }

  async getFromId(uid, productCode) {
    const fromId = await this.ProductMovesRepository.findOne({
      attributes: ['from'],
      where: {
        to: uid,
        product_warehouse_id: productCode,
      },
    });
    return fromId.from;
  }
}
