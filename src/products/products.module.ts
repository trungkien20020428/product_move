import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductProviders } from './providers/products.providers';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ...ProductProviders],
  exports: [...ProductProviders],
})
export class ProductsModule {}
