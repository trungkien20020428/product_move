import { Inject, Injectable } from '@nestjs/common';
import ProductWarehousesModel from '../Models/./product_warehouse.model';
import ProductsModel from '../Models/product.model';

@Injectable()
export class productWarehouseService {
  constructor(
    @Inject('PRODUCT_WAREHOUSE')
    private productWarehouseModel: typeof ProductWarehousesModel,
  ) {}

  async findOne(id) {
    const [product] = await Promise.all([
      this.productWarehouseModel.findOne({
        include: {
          model: ProductsModel,
        },
        where: {
          id,
        },
      }),
    ]);
    return product;
  }
}
