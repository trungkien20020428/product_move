import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductProviders } from './providers/products.providers';
import { ProductLinesProviders } from './providers/product_lines.providers';
import { ProductMoveProviders } from './providers/product_move.providers';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...ProductProviders,
    ...ProductLinesProviders,
    ...ProductMoveProviders,
  ],
  exports: [
    ...ProductProviders,
    ...ProductLinesProviders,
    ...ProductMoveProviders,
  ],
})
export class ProductsModule {}
