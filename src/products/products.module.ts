import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductProviders } from './providers/products.providers';
import { ProductLineController } from './controllers/product_line.controller';
import { productLineService } from './services/product_line.service';
import { productLineValidate } from './validate/product_lines.validate';
import { UsersModule } from '../users/users.module';
import { productValidate } from './validate/product.validate';
import { productMoveService } from './services/product_move.service';
import { ProductMoveController } from './controllers/product_move.controller';
import { productMoveValidate } from './validate/product_move.validate';
import { ProductWarehouseController } from './controllers/product_warehouse.controller';
import { productWarehouseService } from './services/product_warehouse.service';
import { DitributionModule } from '../ditribution/ditribution.module';
import { productWarrantyService } from './services/product_warranty.service';
import { ProductWarrantyController } from './controllers/product_warranty.controller';

@Module({
  imports: [UsersModule],
  controllers: [
    ProductsController,
    ProductLineController,
    ProductMoveController,
    ProductWarehouseController,
    ProductWarrantyController,
  ],
  providers: [
    ProductsService,
    productWarrantyService,
    productLineService,
    productLineValidate,
    productValidate,
    productMoveService,
    productMoveValidate,
    productWarehouseService,
    ...ProductProviders,
  ],
  exports: [...ProductProviders],
})
export class ProductsModule {}
