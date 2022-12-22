import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { productWarehouseService } from '../services/product_warehouse.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { resType } from '../../type/global.type';

@UseGuards(JwtGuard)
@ApiTags('Product Warehouse')
@Controller('product_warehouse')
export class ProductWarehouseController {
  constructor(
    private readonly productWarehouseService: productWarehouseService,
  ) {}

  @Get(':id')
  @ApiBearerAuth()
  async getOne(@Param('id') id: string): resType {
    const product = await this.productWarehouseService.findOne(id);
    return {
      code: 200,
      message: 'get success',
      success: true,
      result: product,
    };
  }
}
