import { Inject, Injectable } from '@nestjs/common';
import ProductWarehousesModel from '../Models/./product_warehouse.model';
import ProductsModel from '../Models/product.model';
import OrderModel from '../../ditribution/Models/order.model';
import CustomerModel from '../../ditribution/Models/customer.model';
import { Op } from 'sequelize';
import { PRODUCT_STATUS } from '../constance/products_status.constance';
import ProductMoveModel from '../Models/product_move.model';
import { productMoveService } from './product_move.service';

@Injectable()
export class productWarehouseService {
  constructor(
    @Inject('PRODUCT_WAREHOUSE')
    private productWarehouseModel: typeof ProductWarehousesModel,

    @Inject('ORDERS_REPOSITORY')
    private orderRepository: typeof OrderModel,

    @Inject('CUSTOMERS_REPOSITORY')
    private customerRepository: typeof CustomerModel,

    @Inject('PRODUCTS_REPOSITORY')
    private productRepository: typeof ProductsModel,

    private readonly productMoveService: productMoveService,
  ) {}

  async findOne(id, uid) {
    const result = {
      product: null,
      customer: null,
      error: '',
    };

    const product = await this.productWarehouseModel
      .findOne({
        include: {
          model: ProductsModel,
        },
        where: {
          id,
          user_id: uid,
        },
      })
      .catch((err) => {
        result.error = err;
      });
    result.product = product;
    if (
      !(product instanceof ProductWarehousesModel) ||
      product?.order_id != null
    ) {
      if (product instanceof ProductWarehousesModel) {
        const order = await this.orderRepository.findOne({
          attributes: ['customer_id'],
          where: { id: product.order_id },
        });

        const customer = await this.customerRepository.findOne({
          where: {
            id: order.customer_id,
          },
        });
        result.customer = customer;
      }
    }

    return result;
  }

  async findAll(uid) {
    const result = await this.productWarehouseModel.findAll({
      include: [{ model: ProductsModel }],
      where: {
        user_id: uid,
        status: {
          [Op.ne]: PRODUCT_STATUS.SOLD,
        },
      },
    });
    return result;
  }

  async updateStatus(id, status) {
    const result = {
      success: true,
    };
    const update = await this.productWarehouseModel
      .update(
        {
          status: status,
        },
        {
          where: { id },
        },
      )
      .catch((err) => {
        result.success = false;
      });
    return result;
  }

  async updateStatuss(ids, status) {
    const update = await this.productWarehouseModel.update(
      {
        status: status,
      },
      {
        where: {
          id: ids,
        },
      },
    );
  }

  //update when recovery
  async updateStatusFollowProductLine(uid, updateAllStatusDto, status) {
    const { product_line_id, moveId } = updateAllStatusDto;
    const productId = await (
      await this.productRepository.findAll({
        attributes: ['id'],
        where: {
          product_line_id,
        },
        raw: true,
      })
    ).map((item) => item.id);
    await this.productWarehouseModel.update(
      {
        status: status,
      },
      {
        where: {
          product_id: productId,
          user_id: uid,
          order_id: {
            [Op.ne]: null,
          },
        },
      },
    );
    const productIds = await (
      await this.productWarehouseModel.findAll({
        attributes: ['product_id'],
        where: {
          product_id: productId,
          user_id: uid,
          order_id: {
            [Op.ne]: null,
          },
        },
        raw: true,
      })
    ).map((item) => item.product_id);
    await this.productMoveService.requestArrayMove(uid, productIds, moveId);
  }

  async getProductbyStatus() {
    const result = await this.productWarehouseModel.findAll({
      include: [{ model: ProductsModel, where: { isCreate: true } }],
    });
    console.log(result)
    return result;
  }
  async getProductByFactory(factoryId) {
    const result = await this.productWarehouseModel.findAll({
      include: [{ model: ProductsModel, where: { isCreate: true } }],
      where: {
        author_id: factoryId,
      },
    });
    return result;
  }

  async getProductByRole(userId) {
    const result = await this.productWarehouseModel.findAll({
      include: [{ model: ProductsModel, where: { isCreate: true } }],
      where: {
        user_id: userId,
      },
    });
    return result;
  }
}
