import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { productMoveService } from '../services/product_move.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { resType } from '../../type/global.type';
import { MoveProductDto } from '../dto/move_product.dto';

@ApiTags('product_move')
@UseGuards(JwtGuard)
@Controller('product_move')
@ApiTags('product_move')
export class ProductMoveController {
  constructor(private readonly productMoveService: productMoveService) {}

  @Get('from')
  @ApiBearerAuth()
  async listFrom(@Request() req): resType {
    const uid = req.user.id;
    //validate

    const listMove = await this.productMoveService.listFrom(uid);

    return {
      code: 200,
      message: 'get list success',
      result: listMove,
      success: true,
    };
  }

  @Get('to')
  @ApiBearerAuth()
  async listTo(@Request() req) {
    const uid = req.user.id;
    const listRecive = await this.productMoveService.listFrom(uid, false);
  }
  @Patch('move')
  @ApiBearerAuth()
  async move(@Body() moveProductDto: MoveProductDto, @Request() req): resType {
    const uid = req.user.id;
    //validate
    //somthing code in here
    const move = await this.productMoveService.move(uid, moveProductDto);

    return {
      code: 200,
      message: 'is moved',
      result: [],
      success: true,
    };
  }

  @Patch('accept')
  @ApiBearerAuth()
  async accept(
    @Body() moveProductDto: MoveProductDto,
    @Request() req,
  ): resType {
    const uid = req.user.id;
    //validate
    //somthing code in here
    await this.productMoveService.receive(uid, moveProductDto);
    return {
      code: 200,
      message: 'move success',
      result: [],
      success: true,
    };
  }
}
