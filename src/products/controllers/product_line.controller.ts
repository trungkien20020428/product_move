import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { ProductLineDto } from '../dto/productLine.dto';
import { productLineService } from '../services/product_line.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { resType } from '../../type/global.type';
import { productLineValidate } from '../validate/product_lines.validate';

@UseGuards(JwtGuard)
@ApiTags('product_line')
@Controller('product_line')
export class ProductLineController {
  constructor(
    private readonly productLineService: productLineService,
    private readonly productValidate: productLineValidate,
  ) {}
  @ApiBearerAuth()
  @Post()
  async addOne(
    @Body() addProductLineDto: ProductLineDto,
    @Request() req,
  ): resType {
    const { name } = addProductLineDto;
    const currentUserId = req.user.id;
    const resFailed = {
      code: 401,
      success: false,
      message: 'Add product line failed',
      result: {},
    };
    const validate = await this.productValidate.validateAddNewProductLine(
      name,
      currentUserId,
    );
    if (!validate.success) {
      resFailed.message = validate.message;
    } else {
      const addProductLine = await this.productLineService.add(name);
      if (addProductLine) {
        return {
          code: 201,
          success: true,
          message: 'Add product line success',
          result: {},
        };
      }
    }
    return resFailed;
  }
  @Delete(':id')
  @ApiBearerAuth()
  async removeOne(@Param('id') id: number, @Request() req): resType {
    const currentId = req.user.id;
    const resFailed = {
      code: 401,
      success: false,
      message: 'Remove product line failed',
      result: {},
    };
    const validate = await this.productValidate.validateRemoveProductLine(
      currentId,
      +id,
    );
    if (!validate.success) {
      resFailed.message = validate.message;
      return resFailed;
    }
    const removeProductLine = await this.productLineService.remove(+id);
    if (removeProductLine) {
      return {
        code: 201,
        success: true,
        message: 'remove product line success',
        result: {},
      };
    }
    return resFailed;
  }
}
