import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { productWarehouseService } from '../services/product_warehouse.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@ApiTags('Product Warehouse')
@Controller('product_warehouse')
export class ProductWarehouseController {
  constructor(
    private readonly productWarehouseService: productWarehouseService,
  ) {}
}
