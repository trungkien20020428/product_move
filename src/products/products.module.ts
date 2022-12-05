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
import { productValidate } from './validate/products.validate';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ProductsController, ProductLineController],
  providers: [
    ProductsService,
    productLineService,
    productValidate,
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
