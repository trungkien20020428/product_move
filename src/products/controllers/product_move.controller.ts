import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { productMoveService } from '../services/product_move.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { resType } from '../../type/global.type';

@ApiTags('product_move')
@UseGuards(JwtGuard)
@Controller('product_move')
@ApiTags('product_move')
export class ProductMoveController {
  constructor(private readonly productMoveService: productMoveService) {}

  @Get()
  @ApiBearerAuth()
  async list(@Request() req): resType {
    const uid = req.user.id;
    await this.productMoveService.move(uid);

    return {
      code: 200,
      message: 'get list success',
      result: [],
      success: true,
    };
  }
}
