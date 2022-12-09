import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import ProductsModel from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private ProductsRepository: typeof ProductsModel,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { amount, distributionId, productLineId, productName } =
      createProductDto;

    const products = [];
    for (let i = 0; i < amount; i++) {
      const product = await this.ProductsRepository.create({
        product_line_id: productLineId,
        name: productName,
      });
      products.push(product);
    }

    return products;
  }

  async findAll() {
    return await this.ProductsRepository.findAll({});
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
