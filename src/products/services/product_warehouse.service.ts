import { Inject, Injectable } from '@nestjs/common';
import ProductWarehousesModel from '../Models/./product_warehouse.model';
import ProductsModel from '../Models/product.model';
import OrderModel from '../../ditribution/Models/order.model';
import CustomerModel from '../../ditribution/Models/customer.model';

@Injectable()
export class productWarehouseService {
  constructor(
    @Inject('PRODUCT_WAREHOUSE')
    private productWarehouseModel: typeof ProductWarehousesModel,

    @Inject('ORDERS_REPOSITORY')
    private orderRepository: typeof OrderModel,

    @Inject('CUSTOMERS_REPOSITORY')
    private customerRepository: typeof CustomerModel,
  ) {}

  async findOne(id, uid) {
    const result = {
      product: null,
      customer: null,
    };
    const [product] = await Promise.all([
      this.productWarehouseModel.findOne({
        include: {
          model: ProductsModel,
        },
        where: {
          id,
          user_id: uid,
        },
      }),
    ]);
    result.product = product;
    if (product.order_id != null) {
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

    return result;
  }

  async findAll(uid) {
    const result = await this.productWarehouseModel.findAll({
      include: [{ model: ProductsModel }],
      where: {
        user_id: uid,
        order_id: null,
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
}
