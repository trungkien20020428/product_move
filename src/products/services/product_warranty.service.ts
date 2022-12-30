import { Inject, Injectable } from '@nestjs/common';
import ProductWarrantyReasonModel from '../Models/product_warranty_reason.model';

@Injectable()
export class productWarrantyService {
  constructor(
    @Inject('PRODUCT_WARRANTY_REASON')
    private productWarrantyReasonModel: typeof ProductWarrantyReasonModel,
  ) {}
  async create(CreateWarrantyDto, uid) {
    const { product_warehouse_id, product_line_id, status } = CreateWarrantyDto;
    const result = await this.productWarrantyReasonModel.create({
      product_line_id,
      product_warehouse_id,
      seriveCenterId: uid,
      status,
    });
    return result;
  }
}
