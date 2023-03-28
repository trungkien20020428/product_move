import {
  Body,
  Controller,
  Get,
  Param,
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { productMoveValidate } from '../validate/product_move.validate';
import { RequestMoveDto } from '../dto/request_move.dto';

@ApiTags('product_move')
@UseGuards(JwtGuard)
@Controller('product_move')
@ApiTags('product_move')
export class ProductMoveController {
  constructor(
    private readonly productMoveService: productMoveService,
    private readonly productMoveValidate: productMoveValidate,
  ) {}

  @Get('from')
  @ApiBearerAuth()
  async listFrom(@Request() req): resType {
    const uid = req.user.id;
    //validate
    const listMove = await this.productMoveService.listFrom(uid);
    if (listMove) {
      return {
        code: 200,
        message: 'get list success',
        result: listMove,
        success: true,
      };
    }
    return {
      code: 401,
      message: 'get list failed',
      result: [],
      success: false,
    };
  }

  @Get('to')
  @ApiBearerAuth()
  async listTo(@Request() req) {
    const uid = req.user.id;
    const listReceive = await this.productMoveService.listFrom(uid, false);
    if (listReceive) {
      return {
        code: 200,
        message: 'get list success',
        result: listReceive,
        success: true,
      };
    }
    return {
      code: 401,
      message: 'get list failed',
      result: [],
      success: false,
    };
  }
  @Patch('move')
  @ApiBearerAuth()
  async move(@Body() moveProductDto: MoveProductDto, @Request() req): resType {
    const uid = req.user.id;
    const validate = await this.productMoveValidate.validateAvailableMove(
      moveProductDto,
    );
    if (!validate.success) {
      return {
        code: 404,
        message: validate.message,
        success: false,
        result: [],
      };
    }
    await this.productMoveService.move(uid, moveProductDto);

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
    const validate = await this.productMoveValidate.validateAvailableMove(
      moveProductDto,
    );
    if (!validate.success) {
      return {
        code: 401,
        message: 'invalid',
        result: [],
        success: false,
      };
    }
    await this.productMoveService.receive(uid, moveProductDto);
    return {
      code: 200,
      message: 'move success',
      result: [],
      success: true,
    };
  }
  @Patch('request')
  @ApiBearerAuth()
  async requestMove(@Request() req, @Body() requestMoveDto: RequestMoveDto) {
    const currentUserId = req.user.id;
    const { productId, moveId } = requestMoveDto;
    await this.productMoveService.requestMove(currentUserId, productId, moveId);
  }

  @ApiBearerAuth()
  @Get('single_from/:productCode')
  async from(@Request() req, @Param('productCode') productCode: string) {
    const currentUserId = req.user.id;
    const result = await this.productMoveService.getFromId(
      currentUserId,
      productCode,
    );
    return result;
  }
}
