import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductProviders } from './providers/products.providers';
import { ProductLinesProviders } from './providers/product_lines.providers';
import { ProductMoveProviders } from './providers/product_move.providers';
import { ProductWarehouseProviders } from './providers/product_warehose.providers';
import { ProductWarrantyProviders } from './providers/product_warranty_reason.providers';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
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
