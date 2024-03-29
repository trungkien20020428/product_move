import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { productWarehouseService } from '../services/product_warehouse.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { resType } from '../../type/global.type';
import { UpdateAllStatusDto } from '../dto/updateAllStatus.dto';

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
  @ApiBearerAuth()
  @Get('byStatus/get')
  async getByStatus() {
    const result = await this.productWarehouseService.getProductbyStatus();
    return result;
  }

  @Get('all')
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

  @Patch('update_status/listProduct/:status')
  @ApiBearerAuth()
  async updateStatuss(@Param('status') status: number, @Request() req) {
    const { ids } = req.body;
    console.log(ids);
    await this.productWarehouseService.updateStatuss(ids, status);
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

  @Patch('update_status/:status')
  @ApiBearerAuth()
  async updateAllStatus(
    @Param('status') status: number,
    @Body() updateAllStatusDto: UpdateAllStatusDto,
    @Request() req,
  ) {
    const uid = req.user.id;
    await this.productWarehouseService.updateStatusFollowProductLine(
      uid,
      req.body,
      +status,
    );
    return 'update success';
  }
}
