import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import ProductsModel from '../entities/product.entity';
import ProductMoveModel from '../entities/product_move.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private ProductsRepository: typeof ProductsModel,

    @Inject('PRODUCT_MOVE_REPOSITORY')
    private ProductMoveRepository: typeof ProductMoveModel,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { amount, distributionId, factoryId, productLineId, productName } =
      createProductDto;

    const products = [];
    const productMoves = [];
    for (let i = 0; i < amount; i++) {
      const product = await this.ProductsRepository.create({
        product_line_id: productLineId,
        name: productName,
      });
      console.log('product id', product.id);
      const productMove = await this.ProductMoveRepository.create({
        from: factoryId,
        to: distributionId,
        product_id: product.id,
        isPending: true,
      });
      products.push(product);
      productMoves.push(productMove);
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
