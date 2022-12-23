import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import ProductsModel from '../Models/product.model';
import ProductMoveModel from '../Models/product_move.model';
import ProductWarehousesModel from '../Models/./product_warehouse.model';
import { PRODUCT_STATUS } from '../constance/products_status.constance';
import { PRODUCT_MOVE } from '../constance/productMove_status.constance';

@Injectable()
export class ProductsService {
  private id_base = 22000001;
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private ProductsRepository: typeof ProductsModel,

    @Inject('PRODUCT_MOVE_REPOSITORY')
    private ProductMoveRepository: typeof ProductMoveModel,

    @Inject('PRODUCT_WAREHOUSE')
    private ProductWarehouseRepository: typeof ProductWarehousesModel,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { amount, distributionId, factoryId, productLineId, productName } =
      createProductDto;

    const products = [];
    for (let i = 0; i < amount; i++) {
      const product = await this.ProductsRepository.create({
        product_line_id: productLineId,
        name: productName,
        isCreate: false,
      });
      await this.ProductMoveRepository.create({
        from: factoryId,
        to: distributionId,
        product_id: product.id,
        status: PRODUCT_MOVE.REQUEST,
      });
      const hashProductId = this.id_base + 'COM' + product.id;
      await this.ProductWarehouseRepository.create({
        product_id: product.id,
        id: hashProductId,
        author_id: factoryId,
        user_id: distributionId,
        status: PRODUCT_STATUS.REQUEST_PRODUCED,
      });
      products.push(product);
    }

    return products;
  }

  async active(listActiveId) {
    const { listId } = listActiveId;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const productActives = [];
    for (let i = 0; i < listId.length; i++) {
      const id = listId[i];
      const productActive = await this.ProductsRepository.update(
        {
          isCreate: true,
        },
        {
          where: {
            id,
          },
        },
      );

      await this.ProductWarehouseRepository.update(
        {
          status: PRODUCT_STATUS.NEW_PRODUCED,
        },
        {
          where: {
            product_id: id,
          },
        },
      );

      productActives.push(productActive);
    }
    return productActives;
  }
  async findAll() {
    return await this.ProductsRepository.findAll({});
  }

  async findOne(id: number) {
    const product = await this.ProductsRepository.findOne({
      where: {
        id,
      },
    });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    await this.ProductsRepository.destroy({
      where: {
        id,
      },
    });
  }
}
