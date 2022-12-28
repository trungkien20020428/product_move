import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
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
  async getOne(@Param('id') id: string, @Request() req): resType {
    const uid = req.user.id;
    const product = await this.productWarehouseService.findOne(id, uid);
    if (product) {
      return {
        code: 200,
        message: 'get success',
        success: true,
        result: product,
      };
    } else
      return {
        code: 404,
        message: 'not Found',
        success: false,
        result: [],
      };
  }

  @Get()
  @ApiBearerAuth()
  async getAll(@Request() req): resType {
    const uid = req.user.id;
    const result = await this.productWarehouseService.findAll(uid);
    if (result) {
      return {
        message: 'ok',
        success: true,
        result: result,
        code: 200,
      };
    }
    return {
      message: 'no',
      success: false,
      result: [],
      code: 404,
    };
  }

  @Patch('update_status/:id/status/:status')
  @ApiBearerAuth()
  async updateStatus(@Param('id') id: string, @Param('status') status: number) {
    const result = await this.productWarehouseService.updateStatus(id, +status);
    if (result.success) {
      return 'update status ok';
    } else {
      return 'update failed';
    }
  }
}
