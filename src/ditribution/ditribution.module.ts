import { Module } from '@nestjs/common';
import { DitributionService } from './ditribution.service';
import { DitributionController } from './ditribution.controller';
import { DistributionProviders } from './providers/ditribution.provider';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [DitributionController],
  providers: [DitributionService, ...DistributionProviders],
})
export class DitributionModule {}
