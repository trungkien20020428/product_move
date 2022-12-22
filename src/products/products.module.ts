import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductProviders } from './providers/products.providers';
import { ProductLinesProviders } from './providers/product_lines.providers';
import { ProductMoveProviders } from './providers/product_move.providers';
import { ProductWarehouseProviders } from './providers/product_warehose.providers';
import { ProductWarrantyProviders } from './providers/product_warranty_reason.providers';
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

@Module({
  imports: [UsersModule],
  controllers: [
    ProductsController,
    ProductLineController,
    ProductMoveController,
    ProductWarehouseController,
  ],
  providers: [
    ProductsService,
    productLineService,
    productLineValidate,
    productValidate,
    productMoveService,
    productMoveValidate,
    productWarehouseService,
    ...ProductProviders,
    ...ProductLinesProviders,
    ...ProductMoveProviders,
    ...ProductWarehouseProviders,
    ...ProductWarrantyProviders,
  ],
  exports: [
    ...ProductProviders,
    ...ProductLinesProviders,
    ...ProductMoveProviders,
    ...ProductWarehouseProviders,
    ...ProductWarrantyProviders,
  ],
})
export class ProductsModule {}
