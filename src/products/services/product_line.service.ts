import { Inject, Injectable } from '@nestjs/common';
import ProductLineModel from '../Models/product_lines.model';

@Injectable()
export class productLineService {
  constructor(
    @Inject('PRODUCT_LINES_REPOSITORY')
    private ProductLinesRepository: typeof ProductLineModel,
  ) {}
  async add(productLine: string) {
    return await this.ProductLinesRepository.create({
      name: productLine,
    });
  }

  async remove(productLineId: number) {
    return await this.ProductLinesRepository.destroy({
      where: { id: productLineId },
    });
  }
}
