import { Inject, Injectable } from '@nestjs/common';
import ProductLineModel from '../entities/product_lines.entity';

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
}
