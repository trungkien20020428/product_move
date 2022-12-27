import { Inject, Injectable } from '@nestjs/common';
import ProductWarehousesModel from '../products/Models/product_warehouse.model';
import CustomerModel from './Models/customer.model';
import OrderModel from './Models/order.model';
import { PRODUCT_STATUS } from '../products/constance/products_status.constance';
import sequelize from 'sequelize';

@Injectable()
export class DitributionService {
  constructor(
    @Inject('PRODUCT_WAREHOUSE')
    private productWarehouseModel: typeof ProductWarehousesModel,

    @Inject('CUSTOMERS_REPOSITORY')
    private customerModel: typeof CustomerModel,

    @Inject('ORDERS_REPOSITORY')
    private orderModel: typeof OrderModel,
  ) {}

  async saleProduct(userId, productId, sellProductDto) {
    const { name, phone, address } = sellProductDto;
    const customer = await this.customerModel.create({ name, address, phone });
    const order = await this.orderModel.create({
      user_id: userId,
      customer_id: customer.id,
      product_id: productId,
    });
    await this.productWarehouseModel.update(
      {
        order_id: order.id,
        status: PRODUCT_STATUS.SOLD,
        warrantyDate: sequelize.literal('NOW() + INTERVAL 1 year'),
      },
      {
        where: {
          product_id: productId,
        },
      },
    );
    return { customer, order };
  }

  async findAll(uid) {}
}
